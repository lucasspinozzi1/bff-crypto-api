import Boom from "@hapi/boom";
import IClientDetail  from "../clientTypes";

export default class ClientDetail implements IClientDetail {
  async getDetails(config: any): Promise<any> {
    try {
      console.log("GetDetail: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
