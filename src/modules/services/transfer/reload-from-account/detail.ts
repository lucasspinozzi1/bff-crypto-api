import Boom from "@hapi/boom";
import { IReloadFromAccountDetails } from "../transferTypes";

export default class ReloadFromAccountDetails
  implements IReloadFromAccountDetails
{
  async getDetails(config: any): Promise<any> {
    try {
      console.log("GetDetails: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
