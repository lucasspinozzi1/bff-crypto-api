import environment from "../../config/env";
import Account from "./account/create/create";
import AccountDetails from "./account/detail/detail";
import Client from "./client/create/create";
import { IAccountDetails, IAccountCreate, IService } from "./types";

export const CLIENT_SERVICES: { [id: string]: IService } = {
  A: new Client()
};

export const ACCOUNT_CREATE: { [id: string]: IAccountCreate } = {
  A: new Account()
};

export const ACCOUNT_DETAILS: { [id: string]: IAccountDetails } = {
  A: new AccountDetails()
};

export const service = CLIENT_SERVICES[environment.service];
export const accountService = ACCOUNT_CREATE[environment.service];
export const accountDetails = ACCOUNT_DETAILS[environment.service];
