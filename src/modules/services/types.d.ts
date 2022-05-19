// Method: getPatientMeasurement
export interface IPatientMeasurementParams {
  userId: string;
}

export interface IPatientMeasurementsResponse {
  records: {
    name: string;
    type: string;
    unit: string;
    measurements: {
      id: string;
      time: string;
      performer: string;
      value?: number;
      systolic?: number;
      diastolic?: number;
    }[];
  }[];
}

// Method: getPatientInfo
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
export interface IPatientAllergiesParams {
  userId: string;
}
export interface IPatientAllergiesResponse {
  allergies: {
    id: string;
    isActive: boolean;
    time: string;
    startDate: string;
    endDate?: string;
    description: string;
    comments: string;
    reportedBy: string;
    performer: string;
    specialization: string;
  }[];
}

export interface IVaccine {
  dose: string;
  date: string;
  applied: boolean;
}
export interface IPatientVaccinesParams {
  userId: string;
}

export interface IPatientVaccinesResponse {
  registeredBy: string;
  schema: string;
  vaccines: {
    name: string;
    vaccineId: string;
    regular: IVaccine[];
    reinforcement: IVaccine[];
    extra: IVaccine[];
  }[];
}

export interface IPatientExamsParams {
  userId: string;
}

interface IPatientExams {
  userId: string;
  id: string;
  type: string;
  name: string;
  date: string;
  performer: string;
  result?:
    | string
    | {
        name: string;
        value: string;
        unit: string;
        referenceRange: string;
      }[];
  procedureZone?: string;
  diagnostic?: string;
  interpretation?: string;
}

export type IPatientExamsResponse = Array<IPatientExams>;

// Method: getPatientRecipesAndPrescriptions
export interface IPatientRecipiesAndPrescriptionsParams {
  userId: string;
}

export interface IPatientRecipiesAndPrescriptions<U> {
  userId: string;
  id: string;
  type: string;
  details: U;
  reportDate: string;
  reporter: {
    name: string;
    speciality: string;
  };
}

export interface IRecipe {
  description?: string;
  indications?: string;
}

export interface IPrescription {
  drug?: string;
  power?: number;
  take?: number;
  frequency?: string;
  quantity?: number;
  via?: string;
  days?: number;
  indications?: string;
  status?: string;
  statusDate?: string;
}

export interface IFamiliarDiseasesParams {
  userId: string;
}

export type IPatientRecipiesAndPrescriptionsResponse = (
  | IPatientRecipiesAndPrescriptions<IRecipe>
  | IPatientRecipiesAndPrescriptions<IPrescription>
)[];

export interface IPatientRecipeOrPrescriptionParams {
  userId: string;
  recipePrescriptionId: string;
}

export type IPatientRecipeOrPrescriptionResponse =
  | IPatientRecipiesAndPrescriptions<"recipe", IRecipe>
  | IPatientRecipiesAndPrescriptions<"prescription", IPrescription>;

export interface IFamiliarDiseasesResponse {
  diseases: {
    diabetes: string[];
    highPressure: string[];
    cancer: string[];
    heartDisease: string[];
    mentalDiseases: string[];
    alzheimer: string[];
    depression: string[];
    anxiety: string[];
    personalityProblems: string[];
    stroke: string[];
    epilepsy: string[];
    tuberculosis: string[];
  };
  details: string;
}

// Method: getPatientsHabits
export interface IPatientHabitsParams {
  userId: string;
}

export type IPatientHabitsResponse = {
  smoking: {
    id: string;
    status: boolean;
    addictionStatus: string;
    passive: boolean;
    quantity: string;
    frequency: string;
    period: string;
    wantsToQuit: boolean;
  };
  alcoholism: {
    id: string;
    status: boolean;
    addictionStatus: string;
    quantity: string;
    frequency: string;
    period: string;
    wantsToQuit: boolean;
  };
  physicalActivity: {
    id: string;
    type: string;
    duration: string;
    frequency: string;
    details: string;
  };
  drugs: {
    id: string;
    name: string;
    observation: string;
  }[];
};

// Disease History
export interface IPatientDiseaseHistoryParams {
  userId: string;
}

export interface IPatientDiseaseHistoryResponse {
  childhood: string[];
  adulthood: string[];
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

// SearchHistory
export interface ISearchHistoryParams {
  userId: string;
}

export interface ISearchHistoryResponse {
  userId: string;
  searches: {
    doctorId: string;
    doctorName: string;
    medicalSpeciality: string;
    date: string;
  }[];
}
export interface IPatientMedicalConsultationParams {
  userId: string;
  medicalConsultationYear: number;
}

export interface IPatientMedicalConsultationResponse {
  userId: string;
  consultations: {
    medicalConsultationId: string;
    month: string;
    name: string;
    doctor: string;
    reason: string;
    healthSite: string;
    date: string;
  }[];
}

export interface IDoctorsParams {
  latitude: string;
  longitude: string;
  type: number; // search type [general, speciality, location, name]
  detail?: string; // doctor name or specialist
  range?: number; // Max distance in meters
  order?: number; // ordering preference
  price?: number; // price of the consultation
  appt?: number; // appointment preference
  mode?: number; // virtual or presential
  date?: string; // exact date of the appointment
}
export interface IMedicalInstitution {
  id: string;
  name: string;
  externalId: string;
  latitude: number;
  longitude: number;
  province: string;
  canton: string;
  district: string;
  distance?: number;
}
export interface IDoctor {
  doctorId: string;
  name: string;
  speciality: string;
  info: string;
  price: string;
  medicalInstitutions: IMedicalInstitution[];
  telephone: string;
  schedule: string;
  web: string;
  email: string;
  acceptVirtual: boolean;
  patientVirtualLink?: string;
  doctorVirtualLink?: string;
}

export interface IDoctorsResponse {
  doctors: IDoctor[];
}

export interface IRegisterPatientParams {
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

export interface IRegisterPatientResponse {
  userId: string;
}

export interface ISyncOCRequest {
  source: string;
  destination: string;
  collection: string;
  parameters: { [key: string]: string };
  token: string;
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

export interface IOspiProService {
  getPatientMeasurement(
    config: IPatientMeasurementParams
  ): Promise<IPatientMeasurementsResponse>;

  getPatientInfo(config: IPatientInfoParams): Promise<IPatientInfoResponse>;

  getPatientAllergies(
    config: IPatientAllergiesParams
  ): Promise<IPatientAllergiesResponse>;

  getPatientExams(config: IPatientExamsParams): Promise<IPatientExamsResponse>;

  getPatientRecipeOrPrescription(
    config: IPatientRecipeOrPrescriptionParams
  ): Promise<IPatientRecipeOrPrescriptionResponse | undefined>;

  getPatientRecipiesAndPrescriptions(
    config: IPatientRecipiesAndPrescriptionsParams
  ): Promise<IPatientRecipiesAndPrescriptionsResponse | undefined>;

  getPatientVaccines(
    config: IPatientVaccinesParams
  ): Promise<IPatientVaccinesResponse>;

  getFamiliarDiseases(
    config: IFamiliarDiseasesParams
  ): Promise<IFamiliarDiseasesResponse | undefined>;

  getPatientHabits(
    config: IPatientHabitsParams
  ): Promise<IPatientHabitsResponse>;

  getDiseaseHistory(
    config: IPatientDiseaseHistoryParams
  ): Promise<IPatientDiseaseHistoryResponse | undefined>;

  getMedicalConsultation(
    config: IPatientMedicalConsultationParams
  ): Promise<IPatientMedicalConsultationResponse>;

  getSearchHistory(
    config: ISearchHistoryParams
  ): Promise<ISearchHistoryResponse>;

  getDoctors(config: IDoctorsParams): Promise<IDoctorsResponse>;

  getDistricts(config: IGetDistrictsParams): Promise<IGetDistrictsResponse>;

  getProvinces(config: IGetProvincesParams): Promise<IGetProvincesResponse>;

  getCantons(config: IGetCantonsParams): Promise<IGetCantonsResponse>;

  getUserInfo(config: IGetUserInfoParams): Promise<IGetUserInfoResponse>;

  registerPatient(
    config: IRegisterPatientParams
  ): Promise<IRegisterPatientResponse>;

  createSyncToken(config: ISyncOCParams): Promise<ISyncOCResponse>;
}
