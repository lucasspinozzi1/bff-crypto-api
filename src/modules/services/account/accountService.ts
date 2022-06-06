import environment from "../../../config/env";
import { IAccountCreate, IAccountDetails } from "./accountTypes";
import Account from "./create/create";
import AccountDetails from "./detail/detail";

export const ACCOUNT_CREATE: { [id: string]: IAccountCreate } = {
  A: new Account(),
};

export const ACCOUNT_DETAILS: { [id: string]: IAccountDetails } = {
  A: new AccountDetails(),
};
export const accountService = ACCOUNT_CREATE[environment.service];
export const accountDetails = ACCOUNT_DETAILS[environment.service];
