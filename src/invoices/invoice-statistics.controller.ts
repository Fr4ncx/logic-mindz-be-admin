import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {VersionedJsonController} from '../common/decorators/VersionedJsonController';
import {V1BaseRoute} from '../utils/routes/V1BaseRoute';
import {Get, UseGuards} from '@nestjs/common';
import {BaseRoute} from '../utils/routes/BaseRoute';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {InvoiceService} from "./services/invoice.service";
import {EntityResponse} from "../utils/api/EntityResponse";
import {User} from "../common/decorators/user.decorator";

@VersionedJsonController(V1BaseRoute.API_VERSION, '/invoice-statistics')
@ApiBearerAuth('Authorization')
@ApiTags('Auth')
export class InvoiceStatisticsController extends BaseRoute {
    constructor(private invoiceService: InvoiceService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getStatistics(@User() user: any) {
        return new EntityResponse(
            {
                total: {
                    amount: 20,
                    balance: 5000
                },
                outstanding: {
                    amount: 10,
                    balance: 500
                },
                totalOverdue: {
                    amount: 0,
                    balance: 0
                },
                cancelled: 1,
                draft: {
                    amount: 1,
                    balance: 200
                },
                recurring: {
                    amount: 0,
                    balance: 0
                },
            });
    }
}
