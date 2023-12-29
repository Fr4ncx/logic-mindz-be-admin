import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Body, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateProductDto} from "./dto/create-product.dto";
import {ProductService} from "./services/product.service";
import {EntityResponse} from "../utils/api/EntityResponse";


@VersionedJsonController(V1BaseRoute.API_VERSION, '/products')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class ProductController extends BaseRoute {
    constructor(private productService: ProductService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async create(@Body() invoiceDto: CreateProductDto) {
        const item = await this.productService.create(invoiceDto);
        return new EntityResponse(item);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const item = await this.productService.getById(id);
        return new EntityResponse(item);
    }

}
