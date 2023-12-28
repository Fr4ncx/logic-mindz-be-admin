import { Get, Logger, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { VersionedJsonController } from '../common/decorators/VersionedJsonController';
import { V1BaseRoute } from '../utils/routes/V1BaseRoute';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {EntityResponse} from "../utils/api/EntityResponse";

@VersionedJsonController(V1BaseRoute.API_VERSION, '/')
@ApiBearerAuth('Authorization')
@ApiTags('Health check')
export class HealthCheckController extends V1BaseRoute {
  protected readonly logger = new Logger(HealthCheckController.name, { timestamp: true });

  constructor() {
    super();
  }

  @Get('/health-check')
  async healthCheck(@Res() response: FastifyReply) {
    return new EntityResponse(response);
  }
}
