import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {TaxRepo} from '../repos/tax.repo';
import {CreateTaxDto} from '../dto/create-tax.dto';
import {TaxDocument} from "../schemas/tax.schema";

@Injectable()
export class TaxService {
    constructor(private taxRepo: TaxRepo) {
    }

    create(createProductDto: CreateTaxDto) {
        return this.taxRepo.insert(createProductDto);
    }

    async getById(id: ObjectId): Promise<TaxDocument> {
        const product = await this.taxRepo.getById(id);
        if (!product) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }
}
