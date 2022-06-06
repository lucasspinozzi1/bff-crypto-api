import Boom from "@hapi/boom";
import { ITransferInToExCreate } from "../transferTypes";

export default class TransferInToExCreate implements ITransferInToExCreate {
  async transferCreateInToEx(config: any): Promise<any> {
    try {
      console.log("Create TransferInToEx: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
