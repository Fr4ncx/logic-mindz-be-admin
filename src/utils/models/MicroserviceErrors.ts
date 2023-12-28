/**
 * MicroserviceErrors
 * @enum MicroserviceErrors
 */
import * as assert from 'assert';

export enum MicroserviceErrors {
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
  MALFORMED_TOKEN = 'MALFORMED_TOKEN',
  BAD_GATEWAY = 'BAD_GATEWAY',
  UNSUPPORTED_DOCUMENT = 'UNSUPPORTED_DOCUMENT',
}

export const MicroserviceErrorMap: any = {
  RESOURCE_NOT_FOUND: {
    status: 404,
    label: 'Resource not found',
    code: 'resource-not-found',
  },
  TOKEN_NOT_FOUND: {
    status: 401,
    label: 'Token not found',
    code: 'token-not-found',
  },
  MALFORMED_TOKEN: {
    status: 401,
    label: 'Malformed token',
    code: 'malformed-token',
  },
  BAD_GATEWAY: {
    status: 502,
    label: 'Bad Gateway',
    code: 'bad-gateway',
  },
  UNSUPPORTED_DOCUMENT: {
    status: 401,
    label: 'Unsupported document',
    code: 'unsupported-document',
  },
};

Object.keys(MicroserviceErrors).forEach((error: any) => {
  let isIncluded = MicroserviceErrorMap.hasOwnProperty(error);
  assert.ok(isIncluded, `Error ${error} is missing`);
});
