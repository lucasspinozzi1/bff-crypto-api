export interface ITransferCreate {
  createAccount(config:any): Promise<any>;
}

export interface ITransferDetails{
getDetails(config:any): Promise<any>;
}