import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { HttpExceptionFunctionType, StatusCodeError } from './http-exception.type';
import { MicroserviceErrorMap } from '../../utils/models/MicroserviceErrors';
import { ErrorMessageDto } from '../dto/error-message.dto';

@Catch(Error)
export class ErrorExceptionFilter<T extends HttpException | Error> implements ExceptionFilter {
  private readonly logger = new Logger(ErrorExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>(); //express or fastify
    const errorResponse = this.getManagedError(exception);
    return response.status(errorResponse.statusCode).send(errorResponse.payload);
  }

  private buildStatus(exception: HttpException | Error): number {
    return this.isHttpException(exception) ? exception.getStatus() : 500;
  }

  private isHttpException(exception: HttpException | Error): exception is HttpException {
    return typeof (<HttpExceptionFunctionType>exception).getStatus == 'function' && typeof (<HttpExceptionFunctionType>exception).getResponse == 'function';
  }

  private getManagedError(exception: HttpException | Error): { payload: ErrorMessageDto; statusCode?: number } {
    let generalStatusCode = this.buildStatus(exception);
    let message: string | undefined;
    if (this.isHttpException(exception)) {
      const httpException = exception.getResponse();
      if (typeof httpException === 'object') {
        message = (<{ message: string }>httpException).message;
      } else {
        message = httpException;
      }
    } else {
      message = exception.message ?? 'Internal server error';
    }

    const payload = {
      status: this.calculateStatus(generalStatusCode),
      error: { code: 'internal-server-error', message: message },
    };
    let statusCode: number = generalStatusCode;
    if (!!message && MicroserviceErrorMap[message]) {
      /* it is a managed one */
      const mError = MicroserviceErrorMap[message];
      if (mError.status) {
        payload.status = this.calculateStatus(mError.status);
        statusCode = mError.status;
      }
      payload.error.code = mError.code;
      payload.error.message = mError.label;
    }

    if (payload.status === 'fail') {
      this.logger.warn(exception.stack);
    } else {
      this.logger.error(exception.stack);
    }

    return { payload, statusCode };
  }

  private calculateStatus(statusCode: number): StatusCodeError {
    return statusCode >= 400 && statusCode <= 499 ? 'fail' : 'error';
  }
}
