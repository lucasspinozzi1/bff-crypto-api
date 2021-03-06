import environment from "../../../config/env";
import { IAccountCreate, IAccountDetails, IAccountList } from "./accountTypes";
import Account from "./create/create";
import AccountDetails from "./detail/detail";
import AccountList from "./list/list";

export const ACCOUNT_CREATE: { [id: string]: IAccountCreate } = {
    A: new Account()
  };
  
export const ACCOUNT_DETAILS: { [id: string]: IAccountDetails } = {
    A: new AccountDetails()
  };

  export const ACCOUNT_LIST: { [id: string]: IAccountList } = {
    A: new AccountList()
  };

  export const accountService = ACCOUNT_CREATE[environment.service];
  export const accountDetails = ACCOUNT_DETAILS[environment.service];
  export const accountList = ACCOUNT_LIST[environment.service];
