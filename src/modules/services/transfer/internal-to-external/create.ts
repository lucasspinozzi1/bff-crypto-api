import Boom from "@hapi/boom";
import { ITransferInToExCreate } from "../transferTypes";

export default class InToExCreate implements ITransferInToExCreate {
  async createInToEx(config: any): Promise<any> {
    try {
      console.log("Create InToEx: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
