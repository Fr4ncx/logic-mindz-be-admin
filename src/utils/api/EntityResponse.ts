/**
 * EntityResponse
 * @abstract EntityResponse
 */
import { ResponseStatus } from './ResponseStatus';

export class EntityResponse<T> {
  constructor(entity: T) {
    return {
      status: ResponseStatus.ok,
      item: entity,
    };
  }
}
