import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Invoice, InvoiceDocument} from '../schemas/invoice.schema';
import {GetAllInvoiceDto} from "../dto/get-all-invoice.dto";

@Injectable()
export class InvoiceRepo {
    constructor(@InjectModel(Invoice.name) private readonly model: Model<InvoiceDocument>) {
    }

    public async findAll(query: GetAllInvoiceDto): Promise<{ items: InvoiceDocument[]; total: number }> {
        const {pageIndex = 1, pageSize = 10} = query;
        const filters = {};

        const invoices = await this.model
            .find(filters)
            .limit(pageSize)
            .skip((pageIndex - 1) * pageSize)
            .exec();

        const count = await this.model.count(filters);

        return {
            items: invoices,
            total: count,
        };
    }

    public insert(document: Invoice): Promise<InvoiceDocument> {
        return this.model.create(document);
    }

    public getById(id: ObjectId): Promise<InvoiceDocument | undefined> {
        return this.model.findOne({_id: id}).exec();
    }

}
