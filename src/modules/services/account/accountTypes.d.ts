export interface ICreateAccountParams {
  accountId?: number;
  // eslint-disable-next-line camelcase
  client_id?: string;
  // eslint-disable-next-line camelcase
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
  createAccount(config: ICreateAccountParams): Promise<any>;
}

export interface IAccountDetails {
  getDetails(config: any): Promise<any>;
}
