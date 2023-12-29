import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BankRepo} from '../repos/bank.repo';
import {CreateBankDto} from '../dto/create-bank.dto';
import {BankDocument} from "../schemas/bank.schema";

@Injectable()
export class BankService {
    constructor(private bankRepo: BankRepo) {
    }

    create(createProductDto: CreateBankDto) {
        return this.bankRepo.insert(createProductDto);
    }

    async getById(id: ObjectId): Promise<BankDocument> {
        const bank = await this.bankRepo.getById(id);
        if (!bank) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return bank;
    }
}
