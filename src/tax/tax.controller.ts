import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Body, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateTaxDto} from "./dto/create-tax.dto";
import {TaxService} from "./services/tax.service";
import {EntityResponse} from "../utils/api/EntityResponse";


@VersionedJsonController(V1BaseRoute.API_VERSION, '/taxes')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class TaxController extends BaseRoute {
    constructor(private taxService: TaxService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async create(@Body() invoiceDto: CreateTaxDto) {
        const item = await this.taxService.create(invoiceDto);
        return new EntityResponse(item);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const item = await this.taxService.getById(id);
        return new EntityResponse(item);
    }

}
