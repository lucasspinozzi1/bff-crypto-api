export interface ICreateAccountParams {
  accountId?: number;
  client_id?: string;
  max_widthdrawal_amount?: number;
  description: string;
  name?: string;
  providerAccountId?: string;
  currency?: string;
  providerMetadata?: string;
  status?: string;
  statusUpdateDateTime?: number;
  type?: string;
  network?: string;
}

export interface IAccountListParams {
  costumerId: string;
  pageSize: string;
  offset: string;
}

export interface IBalance {
  accountId: string | any;
  clientId: string | any;
  status: string | any;
  statusUpdateDateTime: number | any;
  nickName: string | any;
  adress: string | any;
  currency: string | any;
  availableBalance: number | any;
  xpub: string | any;
}

export interface IAccountBalance {
  clientId: string;
  accounts: Array<IBalance> | any;
}

export interface IAccountListResponse {
  accountsBalance: Array<IAccountBalance>;
}

export interface IAccountCreate {
  createAccount(config: ICreateAccountParams): Promise<any>;
}

export interface IAccountDetails {
  getDetails(config: any): Promise<any>;
}

export interface IParseAccount {
  name: string;
  client_id: string;
  status: string;
  statusUpdateDateTime: number;
  nickName: string;
  adress: string;
}

export interface IAccountList {
  listAccounts(config: any): Promise<IAccountBalance>;
}
