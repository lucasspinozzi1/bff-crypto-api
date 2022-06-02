import { IReloadFromAccountDetails } from "../transferTypes";

export default class ReloadFromAccount implements IReloadFromAccount {
  async getDetails(): Promise<any> {
    try {
      return {};
    } 
  }
}
