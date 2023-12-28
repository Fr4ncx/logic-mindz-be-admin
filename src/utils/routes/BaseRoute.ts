/**
 * Base Route
 *
 * @abstract BaseRoute
 */
import { Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { OutgoingHttpHeaders } from 'http2';
import { ArrayResponse } from '../api/ArrayResponse';
import { EntityResponse } from '../api/EntityResponse';
import { MicroserviceErrorMap } from '../models/MicroserviceErrors';

export abstract class BaseRoute {
  public static API_VERSION = 'v1';
  protected logger: Logger;

  constructor() {
    this.logger = new Logger(BaseRoute.name, { timestamp: true });
  }

  /**
   * Format and send an entity response
   * @param  {Object} response The Express response
   * @param responseObject
   */
  sendEntityResponse(response: FastifyReply, responseObject: any) {
    return response.status(200).send(new EntityResponse(responseObject));
  }

  /**
   * Format and send an array response
   * @param  {Object} response The Express response
   * @param responseObject
   */
  sendArrayResponse(response: FastifyReply, responseObject: ArrayResponse<any>) {
    return response.status(200).send(responseObject);
  }

  /**
   * Format and send a page response
   * @param  {Object} response  The Express response
   * @param  {Number} index     The positive page index
   * @param  {Number} size      The positive page size
   * @param  {Array} items      The page items
   * @param  {Number} total     The total number of elements
   */
  sendPageResponse(response: FastifyReply, items: any[], total: number, index: number, size: number) {
    const page = {
      status: 'ok',
      total: total,
      page: {
        index: index,
        size: size,
        items: items,
      },
    };

    return response.status(200).send(page);
  }

  /**
   * Set xml success response
   * @param  {Object} response The Express response
   */
  sendXmlSuccessResponse(response: FastifyReply, message: string) {
    response.header('Content-Type', 'text/xml');
    return response.status(200).send(message);
  }

  sendPdfSuccessResponse(response: FastifyReply, data: Buffer, filename: string) {
    response.headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=' + filename,
      'Content-Length': data.length,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });
    return response.status(200).send(data);
  }

  /**
   * Format and send a void response
   * @param  {Object} response The Express response
   */
  sendVoidSuccessResponse(response: FastifyReply): FastifyReply {
    return response.status(200).send({ status: 'ok' });
  }

  /**
   * Format and send an error response
   * @param response
   * @param  {String} code     The error code
   * @param  {String} message  The error message
   */
  sendErrorResponse(response: FastifyReply, code: string, message: string) {
    response.status(500);
    const payload = { status: 'error', error: { code: code, message: message } };
    if (!!message && MicroserviceErrorMap[message]) {
      /* it is a managed one */
      const mError = MicroserviceErrorMap[message];
      if (mError.status) {
        response.status(mError.status);
      }
      payload.error.code = mError.code;
      payload.error.message = mError.label;
    }

    this.logger.error(`SendErrorResponse - payload: ${JSON.stringify(payload)}`);
    /* if is not a managed one use data passed as arguments */
    return response.send(payload);
  }

  sendErrorResponseWithHeaders(response: FastifyReply, code: string, message: string, headers: OutgoingHttpHeaders) {
    response.headers(headers);
    return response.status(418).send({
      status: 'error',
      error: {
        code: code,
        message: message,
      },
    });
  }

  /**
   * Format and send an error response with a specific HTTP status code
   * @param  {Object} response The Express response
   * @param  {Number} statusCode The HTTP status code
   * @param  {String} code     The error code
   * @param  {String} message  The error message
   * @param {Object} errorPayload The error payload
   */
  sendErrorResponseWithStatusCode(response: FastifyReply, statusCode: number, code: string, message: string, errorPayload?: any) {
    let errorResponse = {
      status: 'error',
      error: {
        code: code,
        message: message,
      } as any,
    };
    if (errorPayload) errorResponse.error.payload = errorPayload;
    return response.status(statusCode).send(errorResponse);
  }

  /**
   * Format and send a generic error response
   */
  sendGenericErrorResponse(response: FastifyReply) {
    return this.sendErrorResponse(response, 'generic-service-error', 'api:errors.generic-service-error');
  }

  /**
   * Format and send a generic error response with custom message
   * @param  {Object} response The Express response
   * @param  {Message} error message
   */
  sendGenericErrorMessageResponse(response: FastifyReply, message: string) {
    return this.sendErrorResponseWithStatusCode(response, 500, 'generic-service-error', message);
  }

  /**
   * Format and send a generic error response with a specific HTTP status code
   * @param  {Object} response The Express response
   * @param  {Number} statusCode The HTTP status code
   */
  sendGenericErrorResponseWithStatusCode(response: FastifyReply, statusCode: number) {
    return this.sendErrorResponseWithStatusCode(response, statusCode, 'generic-service-error', 'api:errors.generic-service-error');
  }

  /**
   * Format and send a bad request response
   * @param response The Express response
   */
  sendBadRequestErrorResponse(response: FastifyReply) {
    return this.sendErrorResponseWithStatusCode(response, 400, 'invalid-parameters', 'api:errors.invalid-parameters');
  }

  /**
   * Format and send a forbidden response
   * @param response The Express response
   */
  sendForbiddenErrorResponse(response: FastifyReply) {
    return this.sendErrorResponseWithStatusCode(response, 403, 'permission-denied', 'api:errors.permission-denied');
  }
}
