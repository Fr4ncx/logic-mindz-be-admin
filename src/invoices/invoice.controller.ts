import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Body, Get, Param, Post, Query, Request, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {InvoiceService} from "./services/invoice.service";
import {EntityResponse} from "../utils/api/EntityResponse";
import {GetAllInvoiceDto} from "./dto/get-all-invoice.dto";
import {ApiPaginatedResponse} from "../common/decorators/paginated-response.decorator";
import {PaginatedDto} from "../common/dto/paginated.dto";
import {PaginatedResponse} from "../utils/api/PaginatedResponse";


@VersionedJsonController(V1BaseRoute.API_VERSION, '/invoices')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class InvoiceController extends BaseRoute {
    constructor(private invoiceService: InvoiceService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Query() dto: GetAllInvoiceDto) {
        const response = await this.invoiceService.findAll(dto);
        return new PaginatedResponse(response.items, response.total, dto.pageSize, dto.pageIndex);
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async create(@Body() invoiceDto: CreateInvoiceDto) {
        const item = await this.invoiceService.create(invoiceDto);
        return new EntityResponse(item);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const item = await this.invoiceService.getById(id);
        return new EntityResponse(item);
    }

}
