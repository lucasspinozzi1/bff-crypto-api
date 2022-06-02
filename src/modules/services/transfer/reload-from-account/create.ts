import Boom from "@hapi/boom";
import { IReloadFromAccountCreate } from "../transferTypes";

export default class ReloadFromAccountCreate
  implements IReloadFromAccountCreate
{
  async createReloadFromAccount(config: any): Promise<any> {
    try {
      console.log("Create ReloadFromAccount: ", config);
      return {};
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
