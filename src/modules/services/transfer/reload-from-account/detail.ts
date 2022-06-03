import Boom from "@hapi/boom";
import { ITransferReloadFromAccountDetails } from "../transferTypes";

export default class ReloadFromAccountDetails implements ITransferReloadFromAccountDetails {
  async getDetails(): Promise<any> {
    try {
      console.log("GetDetails: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}