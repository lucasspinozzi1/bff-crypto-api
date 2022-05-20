/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import environment from "../../../../config/env";
import { HttpRequest } from "../../../http/HttpRequest";
import AppWrite from "../../appWrite/AppWrite";
import { userInfoParser } from "./parsers";
import {
  IService,
  IUserInfoResponse,
  IGetDistrictsParams,
  IGetDistrictsResponse,
  IGetProvincesParams,
  IGetProvincesResponse,
  IGetCantonsParams,
  IGetCantonsResponse,
  IUserInfoParams,
  ISyncOCParams,
  ISyncOCResponse,
  ICreateClientParams,
  ICreateClientResponse,
} from "../../types";

export default class Client implements IService {
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

  async getUserInfo(config: IUserInfoParams): Promise<IUserInfoResponse> {
    try {
      const resultUser = await AppWrite.getDatabase().getDocument(
        "user",
        config.userId
      );
      return userInfoParser.parse(resultUser);
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

  async registerUser(
    config: ICreateClientParams
  ): Promise<ICreateClientResponse> {
    try {
      // const user = await AppWrite.getUserClient().create(
      //   "unique()",
      //   config.email,
      //   config.password,
      //   config.fullName
      // );

      const userId = '12';
      // const [firstName, firstLastName, secondLastName] =
      //   config.fullName.split(" ");

      await AppWrite.getDatabase().createDocument(
        "628694689d255b3b86ca",
        userId,
        {
          update: '',
          created: '',
          provider_client_id: config.clientId,
          first_name: config.firstName,
          last_name: config.lastName,
          kyc_status: '',
          kyc_score: 0,
          identification: config.identification,
          allow_reload: config.allowReload,
          allow_send: config.allowSend,
          maximun_transaction: config.maximum_transaction,
          maximum_recharge: config.maximum_recharge,
          provider_metadata: ''
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
