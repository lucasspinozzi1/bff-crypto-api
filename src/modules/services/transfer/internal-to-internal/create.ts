import Boom from "@hapi/boom";
import { ITransferInToInCreate } from "../transferTypes";

export default class TransferInToInCreate implements ITransferInToInCreate {
  async createTransferInToIn(config: any): Promise<any> {
    try {
      console.log("Create TransferInToIn: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}