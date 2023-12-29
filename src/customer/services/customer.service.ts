import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CustomerRepo} from '../repos/customer.repo';
import {CreateCustomerDto} from '../dto/create-customer.dto';
import {CustomerDocument} from "../schemas/customer.schema";

@Injectable()
export class CustomerService {
    constructor(private customerRepo: CustomerRepo) {
    }


    create(createInvoiceDto: CreateCustomerDto) {
        return this.customerRepo.insert(createInvoiceDto);
    }

    async getById(id: ObjectId): Promise<CustomerDocument> {
        const invoice = await this.customerRepo.getById(id);
        if (!invoice) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return invoice;
    }

}
