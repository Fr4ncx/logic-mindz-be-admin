import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ProductRepo} from '../repos/product.repo';
import {CreateProductDto} from '../dto/create-product.dto';
import {ProductDocument} from "../schemas/product.schema";

@Injectable()
export class ProductService {
    constructor(private productRepo: ProductRepo) {
    }


    create(createProductDto: CreateProductDto) {
        return this.productRepo.insert(createProductDto);
    }

    async getById(id: ObjectId): Promise<ProductDocument> {
        const product = await this.productRepo.getById(id);
        if (!product) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }

}
