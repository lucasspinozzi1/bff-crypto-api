/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import { IAccountCreate } from "../accountTypes";

//TODO: USE ACCOUNT ENTITY
export default class Account implements IAccountCreate {
  
  async createAccount(
    config: any
  ): Promise<any> {
    try {
        console.log("Create account: ",config)
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

}
