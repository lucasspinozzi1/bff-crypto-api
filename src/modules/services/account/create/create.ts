/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import { ACCOUNT_COLLECTION } from "../../../appWrite/collectionRoutes";
import AppWrite from "../../appWrite/AppWrite";
import { IAccountCreate, ICreateAccountParams } from "../accountTypes";

//TODO: USE ACCOUNT ENTITY
export default class Account implements IAccountCreate {
  
  async createAccount(
    config: ICreateAccountParams
  ): Promise<any> {
    try {
        console.log("Create account: ",config);
        
        const {
          accountId="",
          client_id,
          max_widthdrawal_amount,
          description,
          name,
          providerAccountId,
          currency,
          providerMetadata,
          status,
          statusUpdateDateTime,
          type,
          network,
        } = config;
        

        await AppWrite.getDatabase().createDocument(ACCOUNT_COLLECTION, accountId.toString(), {
          updated: new Date().getTime(),
          created: new Date().getTime(),
          accountId,
          client_id,
          max_widthdrawal_amount,
          description,
          name,
          providerAccountId,
          currency,
          providerMetadata,
          status,
          statusUpdateDateTime,
          type,
          network
        }).catch(err => console.log(err));
        
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

}
