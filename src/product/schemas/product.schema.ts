import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Product {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    type: ProductType;

    @Prop({type: String, required: true})
    sku: string;

    @Prop({type: String, required: true})
    category: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Number, required: true})
    price: number;
}

export enum ProductType {
    PRODUCT = "product",
    SERVICE = "service"
}
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({
    name: 1,
});

export type ProductDocument = Product & Document;
