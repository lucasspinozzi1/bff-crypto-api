/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import environment from "../../../../config/env";
import { HttpRequest } from "../../../http/HttpRequest";
import {
  IOspiProService,
  IPatientInfoParams,
  IPatientInfoResponse,
  IGetDistrictsParams,
  IGetDistrictsResponse,
  IGetProvincesParams,
  IGetProvincesResponse,
  IGetCantonsParams,
  IGetCantonsResponse,
  IGetUserInfoParams,
  IGetUserInfoResponse,
  IRegisterUserParams,
  IRegisterUserResponse,
  ISyncOCParams,
  ISyncOCResponse,
} from "../../types";

export default class SACMock implements IOspiProService {
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

  async getPatientInfo(
    _config: IPatientInfoParams
  ): Promise<IPatientInfoResponse> {
    return {
      firstName: "Tatiana",
      firstLastName: "Vega",
      secondLastName: "Madrigal",
      birthDate: "1994-05-16T00:00:00Z",
      height: 170,
      weight: 80,
      biologicSex: "Femenino",
      pronoun: "Ella",
      civilStatus: "Soltera",
      ocupation: "Agente de Ventas",
      address: "Montes de Oca",
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

  async getUserInfo(params: IGetUserInfoParams): Promise<IGetUserInfoResponse> {
    const response = await this.client.post("/validarPaciente", {
      id_institucion: params?.institutionId,
      tipo_id: params?.documentType,
      num_id: params?.documentNumber,
    });
    return response?.data;
  }
}
