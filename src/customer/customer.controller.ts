import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Body, Get, Param, Post, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateCustomerDto} from "./dto/create-customer.dto";
import {CustomerService} from "./services/customer.service";
import {EntityResponse} from "../utils/api/EntityResponse";


@VersionedJsonController(V1BaseRoute.API_VERSION, '/customers')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class CustomerController extends BaseRoute {
    constructor(private customerService: CustomerService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async create(@Body() dto: CreateCustomerDto) {
        const item = await this.customerService.create(dto);
        return new EntityResponse(item);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const item = await this.customerService.getById(id);
        return new EntityResponse(item);
    }

}
