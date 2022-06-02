/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import { CLIENT_COLLECTION } from "../../../appWrite/collectionRoutes";
import { API_KEY } from "../../../http/constant";
import { HttpRequest } from "../../../http/HttpRequest";
import RoutesConfig from "../../../http/httpRoutes";
import AppWrite from "../../appWrite/AppWrite";
import {
  ICreateClient,
  ICreateClientParams,
  ICreateClientResponse,
} from "../clientTypes";

export default class Client implements ICreateClient {
  private client: HttpRequest;

  public constructor() {
    this.client = new HttpRequest(RoutesConfig.endpoint, {
      "x-api-key": API_KEY,
    });
  }

  async createClient(
    config: ICreateClientParams
  ): Promise<ICreateClientResponse> {
    try {
      const {
        clientId = "", // EL CLIENT ID TENEMOS QUE U OBTENERLO DEL JWT U OBTENERLO DEL REQUEST
        identification,
        firstName,
        lastName,
        allowReload,
        allowSend,
        // eslint-disable-next-line camelcase
        maximum_transaction,
        // eslint-disable-next-line camelcase
        maximum_recharge,
      } = config;
      const dynamicMnemonic = "TODO";
      // 1) Crea una billetera en la red de TRON
      const createTronWallet = await this.client.get(
        `${RoutesConfig.tronWallet}?mnemonic=${dynamicMnemonic}`
      );
      // 2) Crea una billetera en la red de ETH
      const createEthWallet = await this.client.get(
        `${RoutesConfig.ethereumWallet}?mnemonic=${dynamicMnemonic}`
      );
      const { xpub: tronXpub, mnemonic: tronMnemonic } = createTronWallet.data;
      const { xpub: ethXpub, mnemonic: ethMnemonic } = createEthWallet.data;

      // // 3) ASOCIA una billetera de TRON Y CREA un customer
      const ledgerTron = await this.client.post(
        `${RoutesConfig.ledgerAccount}`,
        {
          currency: "TRON",
          xpub: tronXpub,
          customer: {
            externalId: clientId,
            accountingCurrency: "USD",
            customerCountry: "AR", // KYC TO_BE_DEFINED
            providerCountry: "AR", // KYC TO_BE_DEFINED
          },
          compliant: false,
          accountCode: identification,
          accountingCurrency: "USD",
          accountNumber: identification,
        }
      );
      // // 4) ASOCIA una billetera de ETH a un Customer Existente
      const ledgerEth = await this.client.post(
        `${RoutesConfig.ledgerAccount}`,
        {
          currency: "ETH",
          xpub: ethXpub,
          customer: {
            externalId: clientId,
            accountingCurrency: "USD",
            customerCountry: "AR", // KYC TO_BE_DEFINED
            providerCountry: "AR", // KYC TO_BE_DEFINED
          },
          compliant: false,
          accountCode: identification,
          accountingCurrency: "USD",
          accountNumber: identification,
        }
      );

      ledgerTron.data.mnemonic = tronMnemonic;
      ledgerEth.data.mnemonic = ethMnemonic;

      const providerMetadata = {
        externalId: clientId,
        customerId: ledgerTron.data.customerId,
        provider_client_id: ledgerTron.data.id,
      };
      // 5) Persistir el cliente en APPWRITE
      // 6) Persistir las dos billeteras en una nueva tabla en APPWRITE
      // 7) Falta dinamizar el mnemonic con alguna libreria de generacion.
      // 8) EL CLIENT ID TENEMOS QUE U OBTENERLO DEL JWT U OBTENERLO DEL REQUEST
      // 9) DEJAR LAS FECHAS COMO TIMESTAMP
      // 10) Generar el ADDRESS de cada billetera.

      await AppWrite.getDatabase()
        .createDocument(CLIENT_COLLECTION, clientId, {
          updated: new Date().getTime(),
          created: new Date().getTime(),
          provider_client_id: ledgerTron.data.customerId,
          clientId,
          first_name: firstName,
          last_name: lastName,
          kyc_status: "",
          kyc_score: 0,
          identification,
          allow_reload: allowReload,
          allow_send: allowSend,
          maximum_transaction,
          maximum_recharge,
          provider_metadata: `${providerMetadata}`,
        })
        .catch((err) => console.log(err));
      return { accounts: [ledgerTron.data, ledgerEth.data] };
    } catch (error) {
      if (error.code === 409) throw Boom.conflict("User already registered");
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
