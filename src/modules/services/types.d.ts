export interface IPatientInfoParams {
  userId: string;
}
export interface IPatientInfoResponse {
  firstName: string;
  firstLastName: string;
  secondLastName?: string;
  birthDate: string;
  height: number;
  weight: number;
  biologicSex: string;
  pronoun: string;
  civilStatus: string;
  ocupation: string;
  address: string;
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

export interface IGetUserInfoParams {
  documentType: number;
  documentNumber: string;
  institutionId?: string;
}

export interface Patient {
  name: string;
  surname: string;
  lastSurname: string;
  dateOfBirth: string;
  gender: string;
}
export interface IGetUserInfoResponse {
  message: string;
  paciente: Patient;
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

export interface IOspiProService {
  getPatientInfo(config: IPatientInfoParams): Promise<IPatientInfoResponse>;

  getDistricts(config: IGetDistrictsParams): Promise<IGetDistrictsResponse>;

  getProvinces(config: IGetProvincesParams): Promise<IGetProvincesResponse>;

  getCantons(config: IGetCantonsParams): Promise<IGetCantonsResponse>;

  getUserInfo(config: IGetUserInfoParams): Promise<IGetUserInfoResponse>;

  registerUser(config: IRegisterUserParams): Promise<IRegisterUserResponse>;

  createSyncToken(config: ISyncOCParams): Promise<ISyncOCResponse>;
}
