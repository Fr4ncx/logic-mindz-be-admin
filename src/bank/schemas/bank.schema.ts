import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Bank {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    iban: string;

    @Prop({type: String, required: true})
    bic: string;
}


export const BankSchema = SchemaFactory.createForClass(Bank);

BankSchema.index({
    name: 1,
});

export type BankDocument = Bank & Document;
