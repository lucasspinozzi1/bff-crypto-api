import Boom from "@hapi/boom";
import { ACCOUNT_COLLECTION } from "../../../appWrite/collectionRoutes";
import { accountParser } from "../../../appWrite/helper/parser";
import { API_KEY } from "../../../http/constant";
import HttpRequest from "../../../http/HttpRequest";
import RoutesConfig from "../../../http/httpRoutes";
import AppWrite from "../../appWrite/AppWrite";
import { IAccountBalance, IAccountList, IBalance } from "../accountTypes";




export default class AccountList implements IAccountList {

  private client: HttpRequest;

  public constructor() {
    this.client = new HttpRequest(RoutesConfig.endpoint, {
      "x-api-key": API_KEY,
    });
  }

  async listAccounts(
  ): Promise<IAccountBalance> {
    try{      
        const customerId = '6273da00b80e05631acb20fb';
        const pageSize = 10;
        const offset= 0;

      const getBalanceWallets = await this.client.get(
      `${RoutesConfig.ledgerAccountCustomer}/${customerId}?pageSize=${pageSize}&offset=${offset}`
      );
            
      let walletAccountBalance: Array<IBalance> = [];

      for (var i=0; i < getBalanceWallets.data.length; i++) {
        const accountId = getBalanceWallets.data[i].id
        
        const getAccountAppWrite = await
        AppWrite.getDatabase().getDocument(
          ACCOUNT_COLLECTION,
          accountId
        ).catch(e => console.log(e));
        
        const {
          client_id,
          statusUpdateDateTime,
          nickName,
          adress,
          status
        } = accountParser.parse(getAccountAppWrite);
        
        var accounts ={
          accountId: getBalanceWallets.data[i].id, 
          clientId: client_id,
          status: status,
          statusUpdateDateTime: statusUpdateDateTime,
          nickName: nickName,
          adress: adress,
          currency: getBalanceWallets.data[i].currency,
          availableBalance: getBalanceWallets.data[i].balance.availableBalance,
          xpub: getBalanceWallets.data[i].xpub
        } ;
        walletAccountBalance.push(accounts);
      }

      const response: IAccountBalance = {
        clientId: customerId,
        accounts: walletAccountBalance
      }
           
      return response;

    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }

  }
}
