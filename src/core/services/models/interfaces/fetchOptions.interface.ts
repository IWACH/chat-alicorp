import { EHttpMethod } from "../enums/httpMethod.enum";

export interface IFetchOptions {
  method?: EHttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}
