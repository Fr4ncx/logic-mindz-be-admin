import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Tax {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Number, required: true, unique: true})
    percentage: number;
}


export const TaxSchema = SchemaFactory.createForClass(Tax);

TaxSchema.index({
    name: 1,
});

export type TaxDocument = Tax & Document;
