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

export interface ITransferReloadFromTransferCreate {
  createReloadFromTransferCreate(config: any): Promise<any>;
}

export interface ITransferReloadFromTransferDetails {
  getDetails(config: any): Promise<any>;
}
