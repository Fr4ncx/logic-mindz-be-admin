/**
 * ArrayResponse
 * @abstract ArrayResponse
 */
import { ResponseStatus } from './ResponseStatus';

export class ArrayResponse<T> {
  constructor(data: Array<T>) {
    return {
      status: ResponseStatus.ok,
      items: data,
    };
  }
}
