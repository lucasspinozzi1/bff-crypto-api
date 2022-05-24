/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";

//TODO: USE ACCOUNT ENTITY
export default class AccountDetails {
  
  async getDetails(
    config: any
  ): Promise<any> {
    try {
        console.log("GetDetails: ",config)
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

}