import Boom from "@hapi/boom";
import { ITransferReloadFromTransferCreate } from "../transferTypes";

export default class ReloadFromTransferCreate implements IReloadFromTransferCreate {
  async createReloadFromTransfer(config: any): Promise<any> {
    try {
      console.log("Create ReloadFromTransfer: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}