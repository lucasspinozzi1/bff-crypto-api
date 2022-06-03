import Boom from "@hapi/boom";
import { ITransferInToInCreate } from "../transferTypes";

export default class InToInCreate implements ITransferInToInCreate {
  async createInToIn(config: any): Promise<any> {
    try {
      console.log("Create InToIn: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}