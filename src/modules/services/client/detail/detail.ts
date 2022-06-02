import Boom from "@hapi/boom";
import { IClientDetails } from "../../transfer/transferTypes";


export default class ClientDetail implements IClientDetails {
  async getDetails(config: any): Promise<any> {
    try {
      console.log("GetDetail: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
