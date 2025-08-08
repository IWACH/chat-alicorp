import { EHttpMethod } from "../models/enums/httpMethod.enum";
import { IApiResponse } from "../models/interfaces/apiResponse.interface";
import { IFetchOptions } from "../models/interfaces/fetchOptions.interface";

interface Props {
  url: string;
  options?: IFetchOptions;
}

export const fetcher = async <T>({
  url,
  options = {},
}: Props): Promise<IApiResponse<T>> => {
  try {
    const response = await fetch(url, {
      method: options.method || EHttpMethod.Get,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      return {
        error: `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Error desconocido",
    };
  }
};
