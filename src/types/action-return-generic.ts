import { IResponse } from "./response-generic";

export interface IApiError {
  message?: string;
  statusCode?: number;
  errors?: { property: string; message: string }[];
}

export interface IActionResponse<T = IResponse> {
  error?: IApiError;
  data?: T;
}
