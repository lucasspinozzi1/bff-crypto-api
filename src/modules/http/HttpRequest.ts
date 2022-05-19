import axios, { AxiosInstance, AxiosResponse } from "axios";

type HttpRequestResponse = AxiosResponse;

interface RequestHeaders {
  [name: string]: string;
}

interface RequestConfig {
  headers: RequestHeaders;
}

export class HttpRequest {
  private readonly DEFAULT_REQUEST_CONFIG: RequestConfig = {
    headers: {},
  };

  private client: AxiosInstance;

  public constructor(baseURL: string, headers: RequestHeaders = {}) {
    this.client = axios.create({ baseURL, headers });
  }

  get(
    url: string,
    config: RequestConfig = this.DEFAULT_REQUEST_CONFIG
  ): Promise<HttpRequestResponse> {
    return this.client.get(url, { ...config });
  }

  post(
    url: string,
    data: unknown,
    config: RequestConfig = this.DEFAULT_REQUEST_CONFIG
  ): Promise<HttpRequestResponse> {
    return this.client.post(url, data, { ...config });
  }

  put(
    url: string,
    data: unknown,
    config: RequestConfig = this.DEFAULT_REQUEST_CONFIG
  ): Promise<HttpRequestResponse> {
    return this.client.put(url, data, { ...config });
  }
}

export default HttpRequest;
