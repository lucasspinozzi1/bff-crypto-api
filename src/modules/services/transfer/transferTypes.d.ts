export interface IClientCreate {
  createTransferInToEx(config: any): Promise<any>;
}

export interface IClientDetails {
  getDetails(config: any): Promise<any>;
}

export interface ITransferInToExCreate {
  createTransferInToEx(config: any): Promise<any>;
}

export interface ITransferInToExDetails {
  createAccount(config: { firstName: string; lastName: string; });
  getDetails(config: any): Promise<any>;
}

export interface ITransferInToInCreate {
  createTransferInToIn(config: any): Promise<any>;
}

export interface ITransferInToInDetails {
  getDetails(config: any): Promise<any>;
}

export interface IReloadFromAccountCreate {
  createReloadFromAccount(config: any): Promise<any>;
}

export interface IReloadFromAccountDetails {
  getDetails(config: any): Promise<any>;
}
