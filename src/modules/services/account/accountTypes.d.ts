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

export interface IAccountCreate {
  createAccount(config:ICreateAccountParams): Promise<any>;
}

export interface IAccountDetails{
getDetails(config:any): Promise<any>;
}
