import mongoose, {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Invoice {
    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer'})
    customerId: ObjectId;

    @Prop({type: Date, required: true})
    invoiceDate: Date;

    @Prop({type: Date, required: true})
    dueDate: Date;

    @Prop({type: String, required: true})
    status: string;

    @Prop({type: String, required: true})
    referenceNumber: string;

    @Prop({type: Boolean, required: true})
    recurring: boolean;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'})
    productId: ObjectId;

    @Prop({type: Number, required: true})
    qty: number

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tax'})
    taxId: ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Bank'})
    companyBank: ObjectId;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

InvoiceSchema.index({
    customerId: 1,
});

export type InvoiceDocument = Invoice & Document;
