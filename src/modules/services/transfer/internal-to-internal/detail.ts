/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import { ITransferInToInDetails } from "../transferTypes";

// TODO: USE ACCOUNT ENTITY
export default class TransferInToInDetails implements ITransferInToInDetails {
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
