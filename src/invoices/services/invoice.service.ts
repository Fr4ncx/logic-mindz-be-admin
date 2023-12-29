import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InvoiceRepo} from '../repos/invoice.repo';
import {CreateInvoiceDto} from '../dto/create-invoice.dto';
import {InvoiceDocument} from "../schemas/invoice.schema";
import {GetAllInvoiceDto} from "../dto/get-all-invoice.dto";

@Injectable()
export class InvoiceService {
    constructor(private invoiceRepo: InvoiceRepo) {
    }

    public async findAll(query: GetAllInvoiceDto): Promise<{ items: InvoiceDocument[]; total: number }> {
        return this.invoiceRepo.findAll(query);
    }

    create(createInvoiceDto: CreateInvoiceDto) {
        return this.invoiceRepo.insert(createInvoiceDto);
    }

    async getById(id: ObjectId): Promise<InvoiceDocument> {
        const invoice = await this.invoiceRepo.getById(id);
        if (!invoice) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return invoice;
    }

}
