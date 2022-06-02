/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import { IAccountDetails } from "../accountTypes";

// TODO: USE ACCOUNT ENTITY
export default class AccountDetails implements IAccountDetails {
  async getDetails(config: any): Promise<any> {
    try {
      // eslint-disable-next-line no-console
      console.log("GetDetails: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
