export interface IResponse<T = any> {
  data: T;
}

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
  nextPage: any;
  prevPage: any;
}
export interface IResponsePagination<T = any> {
  data: T[];
  _pagination: IPagination;
}
