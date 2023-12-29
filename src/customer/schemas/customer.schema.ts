import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Customer {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    address: string;

    @Prop({type: String, required: true})
    vatNumber: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index({
    name: 1,
});

export type CustomerDocument = Customer & Document;
