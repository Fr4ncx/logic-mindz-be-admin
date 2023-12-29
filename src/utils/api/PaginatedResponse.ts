/**
 * ArrayResponse
 * @abstract ArrayResponse
 */
import {ResponseStatus} from './ResponseStatus';

export class PaginatedResponse<T> {
  constructor(data: Array<T>, total: number, pageSize: number, index: number) {
    return {
      status: ResponseStatus.ok,
      total,
      page: {
        size: pageSize,
        items: data,
        index
      }

    };
  }
}
