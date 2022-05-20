/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import environment from "../../../../config/env";
import { HttpRequest } from "../../../http/HttpRequest";
import {
  IService,
  IUserInfoParams,
  IUserInfoResponse,
  IGetDistrictsParams,
  IGetDistrictsResponse,
  IGetProvincesParams,
  IGetProvincesResponse,
  IGetCantonsParams,
  IGetCantonsResponse,
  IRegisterUserParams,
  IRegisterUserResponse,
  ISyncOCParams,
  ISyncOCResponse,
} from "../../types";

export default class SACMock implements IService {
  private readonly baseURL = "https://www.saludaunclic.com/apiSandBox";

  private client: HttpRequest;

  public constructor() {
    this.client = new HttpRequest(this.baseURL, {
      Authorization: environment.sacAPIKey,
    });
  }

  createSyncToken(_config: ISyncOCParams): Promise<ISyncOCResponse> {
    throw new Error("Method not implemented.");
  }

  registerUser(_config: IRegisterUserParams): Promise<IRegisterUserResponse> {
    throw new Error("Method not implemented.");
  }

  async getUserInfo(_config: IUserInfoParams): Promise<IUserInfoResponse> {
    return {
      fullName: "Tatiana Vega",
      email: "Vega@mail.com",
    };
  }

  async getDistricts(
    params: IGetDistrictsParams
  ): Promise<IGetDistrictsResponse> {
    const response = await this.client.post("/tercerNivelGeoAPI", {
      id_pais: params?.countryCode,
      codigoNivel2: params?.level2Code,
    });

    return response?.data;
  }

  async getProvinces(
    params: IGetProvincesParams
  ): Promise<IGetProvincesResponse> {
    const response = await this.client.post("/primerNivelGeoAPI", {
      id_pais: params?.countryCode,
    });

    return response?.data;
  }

  async getCantons(params: IGetCantonsParams): Promise<IGetCantonsResponse> {
    const response = await this.client.post("/segundoNivelGeoAPI", {
      id_pais: params?.countryCode,
      codigoNivel1: params?.level1Code,
    });

    return response?.data;
  }
}
