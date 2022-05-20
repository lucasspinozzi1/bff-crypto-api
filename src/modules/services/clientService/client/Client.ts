/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import environment from "../../../../config/env";
import { HttpRequest } from "../../../http/HttpRequest";
import AppWrite from "../../appWrite/AppWrite";
import { patientInfoParser } from "./parsers";
import {
  IOspiProService,
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
  IPatientInfoParams,
  ISyncOCParams,
  ISyncOCResponse,
} from "../../types";

export default class Client implements IOspiProService {
  private readonly baseURL = "";

  private client: HttpRequest;

  public constructor() {
    this.client = new HttpRequest(this.baseURL, {
      Authorization: environment.sacAPIKey,
    });
  }

  async createSyncToken(config: ISyncOCParams): Promise<ISyncOCResponse> {
    const syncDescription = {
      source: config.source,
      destination: config.destination,
      collection: config.collection,
      parameters: config.parameters,
    };
    const result = await AppWrite.getDatabase().createDocument(
      "connect_sync_tokens",
      "unique()",
      {
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        syncDescription: JSON.stringify(syncDescription),
      },
      [`user:${config.parameters.userId}`]
    );

    return {
      token: result.$id,
    };
  }

  async getPatientInfo(
    config: IPatientInfoParams
  ): Promise<IPatientInfoResponse> {
    try {
      const resultPatient = await AppWrite.getDatabase().getDocument(
        "patient",
        config.userId
      );
      return patientInfoParser.parse(resultPatient);
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getDistricts(
    config: IGetDistrictsParams
  ): Promise<IGetDistrictsResponse> {
    const response = await this.client.post("/tercerNivelGeoAPI", {
      id_pais: config?.countryCode,
      codigoNivel2: config?.level2Code,
    });

    return response?.data;
  }

  async getProvinces(
    config: IGetProvincesParams
  ): Promise<IGetProvincesResponse> {
    const response = await this.client.post("/primerNivelGeoAPI", {
      id_pais: config?.countryCode,
    });

    return response?.data;
  }

  async getCantons(config: IGetCantonsParams): Promise<IGetCantonsResponse> {
    const response = await this.client.post("/segundoNivelGeoAPI", {
      id_pais: config?.countryCode,
      codigoNivel1: config?.level1Code,
    });

    return response?.data;
  }

  async getUserInfo(config: IGetUserInfoParams): Promise<IGetUserInfoResponse> {
    const response = await this.client.post("/validarPaciente", {
      id_institucion: config?.institutionId,
      tipo_id: config?.documentType,
      num_id: config?.documentNumber,
    });

    return response?.data;
  }

  async registerUser(
    config: IRegisterUserParams
  ): Promise<IRegisterUserResponse> {
    try {
      const user = await AppWrite.getUserClient().create(
        "unique()",
        config.email,
        config.password,
        config.fullName
      );
      const userId = user.$id;

      const [firstName, firstLastName, secondLastName] =
        config.fullName.split(" ");

      await AppWrite.getDatabase().createDocument(
        "628694689d255b3b86ca",
        userId,
        {
          firstName,
          firstLastName,
          secondLastName,
          biologicalSex:
            config.biologicalSex === "1" ? "Femenino" : "Masculino",
          pronoun: config.pronoun,
          birthDate: config.birthDate,
          phoneNumbers: config.phoneNumbers,
          documentType: config.documentType,
          documentNumber: config.documentNumber,
          district: config.district,
          canton: config.canton,
          province: config.province,
          country: config.country,
        }
      );

      return {
        userId,
      };
    } catch (error) {
      if (error.code === 409) throw Boom.conflict("User already registered");
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
