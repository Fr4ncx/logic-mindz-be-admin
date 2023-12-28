/**
 * EntityResponse
 * @abstract EntityResponse
 */
import { ResponseStatus } from './ResponseStatus';

export class VoidResponse {
  constructor() {
    return {
      status: ResponseStatus.ok,
    };
  }
}
