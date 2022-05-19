import axios, { AxiosInstance } from "axios";
import environment from "../../../config/env";
import { ISyncOCRequest } from "../types";

class ApiConnect {
  private httpClient: AxiosInstance;

  private baseUrl: string;

  public constructor() {
    this.baseUrl = environment.CONNECT_CONFIG.apiURL;
    this.httpClient = axios.create({
      timeout: 10000,
      auth: {
        username: environment.CONNECT_CONFIG.username,
        password: environment.CONNECT_CONFIG.password,
      },
    });
  }

  public sync(request: ISyncOCRequest) {
    this.httpClient
      .request({
        url: `${this.baseUrl}/api/v1/op-sync`,
        method: "POST",
        data: request,
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }
}

export default new ApiConnect();
