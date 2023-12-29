import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Tax, TaxDocument} from '../schemas/tax.schema';

@Injectable()
export class TaxRepo {
    constructor(@InjectModel(Tax.name) private readonly model: Model<TaxDocument>) {
    }

    public insert(document: Tax): Promise<TaxDocument> {
        return this.model.create(document);
    }

    public getById(id: ObjectId): Promise<TaxDocument | undefined> {
        return this.model.findOne({_id: id}).exec();
    }

}
