export interface IClientCreate {
  createInToEx(config: any): Promise<any>;
}

export interface IClientDetails {
  getDetails(config: any): Promise<any>;
}

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

export interface ITransferReloadFromAccountCreate {
  createReloadFromTransferCreate(config: any): Promise<any>;
}

export interface ITransferReloadFromAccountDetails {
  getDetails(config: any): Promise<any>;
}
