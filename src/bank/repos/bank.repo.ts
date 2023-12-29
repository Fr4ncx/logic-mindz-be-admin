import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Bank, BankDocument} from '../schemas/bank.schema';

@Injectable()
export class BankRepo {
    constructor(@InjectModel(Bank.name) private readonly model: Model<BankDocument>) {
    }

    public insert(document: Bank): Promise<BankDocument> {
        return this.model.create(document);
    }

    public getById(id: ObjectId): Promise<BankDocument | undefined> {
        return this.model.findOne({_id: id}).exec();
    }

}
