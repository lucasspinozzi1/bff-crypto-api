export interface IUserInfoParams {
  userId: string;
}
export interface IUserInfoResponse {
  fullName: string;
  email: string;
}
export interface Catalogo {
  codigo: string;
  nombre: string;
}

export interface IGetDistrictsResponse {
  error: boolean;
  message: string;
  catalogo: Catalogo[];
}

export interface IGetDistrictsParams {
  countryCode: number;
  level2Code: number;
}

export interface PrimerNivel {
  codigo: string;
  nombre: string;
}

export interface IGetProvincesResponse {
  error: boolean;
  message: string;
  primerNivel: PrimerNivel[];
}

export interface IGetProvincesParams {
  countryCode: number;
}

export interface IGetCantonsParams {
  countryCode: number;
  level1Code: number;
}

export interface SegundoNivel {
  codigo: string;
  nombre: string;
}

export interface IGetCantonsResponse {
  error: boolean;
  message: string;
  segundoNivel: SegundoNivel[];
}
export interface ISyncOCParams {
  source: string;
  destination: string;
  collection: string;
  parameters: { [key: string]: string };
}

export interface ISyncOCResponse {
  token: string;
}
export interface ISyncOCRequest {
  source: string;
  destination: string;
  collection: string;
  parameters: { [key: string]: string };
  token: string;
}
export interface IRegisterUserParams {
  email: string;
  password: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  biologicalSex: string;
  pronoun: string;
  phoneNumbers: string[];
  province: string;
  canton: string;
  district: string;
  country: string;
}
export interface IRegisterUserResponse {
  userId: string;
}

export interface ICreateClientParams {
  clientId?: string;
  firstName: string;
  lastName: string;
  email: string;
  identification: string;
  allowReload?: boolean;
  allowSend?: boolean;
  maximum_transaction?: number;
  maximum_recharge?: number;
}

export interface ICreateClientResponse {
  accounts: Array<ICreateAccountResponse>;
}

export interface ICreateAccountResponse {
  id: string;
  active: boolean;
  frozen: boolean;
  currency: string;
  balance: {
    accountBalance: string;
    availableBalance: string;
  };
  customerId: string;
  accountCode: string;
  xpub: string;
  mnemonic: string;
}

export interface IService {
  createClient(config: ICreateClientParams): Promise<ICreateClientResponse>;
}
