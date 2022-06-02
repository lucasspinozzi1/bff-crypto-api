export interface ITransferInToExCreate {
  createInToEx(config: any): Promise<any>;
}

export interface ITransferInToExDetails {
  getDetails(config: any): Promise<any>;
}

export interface ITransferInToInCreate {
  createInToIn(config: any): Promise<any>;
}

export interface ITransferInToInDetails {
  getDetails(config: any): Promise<any>;
}

export interface IReloadFromAccountCreate {
  createReloadFromTransferCreate(config: any): Promise<any>;
}

export interface IReloadFromAccountDetails {
  getDetails(config: any): Promise<any>;
}
