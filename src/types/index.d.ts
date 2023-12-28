export declare type PagedResult<T> = {
  items: Array<T>;
  totalCount: number;
};

declare global {
  type ObjectId = Types.ObjectId;
}
