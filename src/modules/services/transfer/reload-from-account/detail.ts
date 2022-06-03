import Boom from "@hapi/boom";
import { IReloadFromAccountDetails } from "../transferTypes";

export default class ReloadFromAccount implements ITransferReloadFromAccount {
  async getDetails(): Promise<any> {
    try {
      // eslint-disable-next-line no-console
      console.log("GetDetails: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
