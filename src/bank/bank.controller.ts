import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Body, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateBankDto} from "./dto/create-bank.dto";
import {BankService} from "./services/bank.service";
import {EntityResponse} from "../utils/api/EntityResponse";


@VersionedJsonController(V1BaseRoute.API_VERSION, '/banks')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class BankController extends BaseRoute {
    constructor(private bankService: BankService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async create(@Body() invoiceDto: CreateBankDto) {
        const item = await this.bankService.create(invoiceDto);
        return new EntityResponse(item);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const item = await this.bankService.getById(id);
        return new EntityResponse(item);
    }

}
