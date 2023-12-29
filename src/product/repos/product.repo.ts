import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product, ProductDocument} from '../schemas/product.schema';

@Injectable()
export class ProductRepo {
    constructor(@InjectModel(Product.name) private readonly model: Model<ProductDocument>) {
    }

    public insert(document: Product): Promise<ProductDocument> {
        return this.model.create(document);
    }

    public getById(id: ObjectId): Promise<ProductDocument | undefined> {
        return this.model.findOne({_id: id}).exec();
    }

}
