import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Customer, CustomerDocument} from '../schemas/customer.schema';

@Injectable()
export class CustomerRepo {
    constructor(@InjectModel(Customer.name) private readonly model: Model<CustomerDocument>) {
    }

    public insert(document: Customer): Promise<CustomerDocument> {
        return this.model.create(document);
    }

    public getById(id: ObjectId): Promise<CustomerDocument | undefined> {
        return this.model.findOne({_id: id}).exec();
    }

}
