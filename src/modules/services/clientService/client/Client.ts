/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { Query } from "node-appwrite";
import Boom from "@hapi/boom";
import environment from "../../../../config/env";
import { HttpRequest } from "../../../http/HttpRequest";
import AppWrite, { AppwriteDocument } from "../../appWrite/AppWrite";
import {
  filterGeolocation,
  orderDoctorsByDistance,
  orderDoctorsByPriceLowHigh,
  orderDoctorsAlphabetically,
  calculateMedicalInstitutionDistance,
} from "./transform";
import {
  familiarDiseasesParser,
  disesaseHistoryParser,
  recipiesParser,
  prescriptionsParser,
  medicalConsultationParser,
  examsParser,
  patientAllergiesParser,
  patientMeasurementsParser,
  patientVaccinesParser,
  patientHabitsParser,
  searchHistoryParser,
  doctorsParser,
  patientInfoParser,
} from "./parsers";
import {
  IFamiliarDiseasesParams,
  IFamiliarDiseasesResponse,
  IOspiProService,
  IPatientExamsParams,
  IPatientExamsResponse,
  IPatientInfoResponse,
  IPatientMeasurementParams,
  IPatientMeasurementsResponse,
  IPatientRecipeOrPrescriptionParams,
  IPatientRecipeOrPrescriptionResponse,
  IPatientRecipiesAndPrescriptionsParams,
  IPatientRecipiesAndPrescriptionsResponse,
  IPatientVaccinesParams,
  IPatientVaccinesResponse,
  IPatientAllergiesParams,
  IPatientAllergiesResponse,
  IPatientHabitsParams,
  IPatientHabitsResponse,
  IPatientDiseaseHistoryParams,
  IPatientDiseaseHistoryResponse,
  IGetDistrictsParams,
  IGetDistrictsResponse,
  IGetProvincesParams,
  IGetProvincesResponse,
  IGetCantonsParams,
  IGetCantonsResponse,
  IGetUserInfoParams,
  IGetUserInfoResponse,
  ISearchHistoryParams,
  ISearchHistoryResponse,
  IPatientMedicalConsultationParams,
  IPatientMedicalConsultationResponse,
  IDoctorsParams,
  IDoctorsResponse,
  IRegisterPatientParams,
  IRegisterPatientResponse,
  IPatientInfoParams,
  ISyncOCParams,
  ISyncOCResponse,
} from "../../types";
import {
  DoctorSearchMode,
  DoctorSearchOrder,
  DoctorSearchType,
} from "../../../../config/const";

export default class Client implements IOspiProService {
  private readonly baseURL = "";

  private client: HttpRequest;

  public constructor() {
    this.client = new HttpRequest(this.baseURL, {
      Authorization: environment.sacAPIKey,
    });
  }

  async createSyncToken(config: ISyncOCParams): Promise<ISyncOCResponse> {
    const syncDescription = {
      source: config.source,
      destination: config.destination,
      collection: config.collection,
      parameters: config.parameters,
    };
    const result = await AppWrite.getDatabase().createDocument(
      "connect_sync_tokens",
      "unique()",
      {
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        syncDescription: JSON.stringify(syncDescription),
      },
      [`user:${config.parameters.userId}`]
    );

    return {
      token: result.$id,
    };
  }

  async getDoctors(config: IDoctorsParams): Promise<IDoctorsResponse> {
    const query = [];

    if (config.detail) query.push(Query.search("detail", config.detail));
    if (config.price)
      query.push(Query.lesserEqual("price", config.price.toString()));

    const resultDoctors = await AppWrite.getDatabase().listDocuments(
      "ehg_doctors",
      query
    );

    if (resultDoctors.total < 1) throw Boom.notFound();

    try {
      let doctors = [];

      for (const document of resultDoctors.documents) {
        const obj: AppwriteDocument = document;

        const { medicalInstitutions } = obj;

        if (typeof medicalInstitutions !== "string") {
          throw Boom.badData("No medical institutions found");
        }

        doctors.push(
          doctorsParser.parse({
            ...obj,
            medicalInstitutions: JSON.parse(medicalInstitutions),
          })
        );
      }
      if (config.mode && config.mode === DoctorSearchMode.virtual) {
        doctors = doctors.filter((doctor) => doctor.acceptVirtual);
      }

      doctors = calculateMedicalInstitutionDistance(
        doctors,
        config.latitude,
        config.longitude
      );

      if (config.type !== DoctorSearchType.name) {
        doctors = filterGeolocation(
          doctors,
          config.range ?? environment.maxRangeMeters
        );
      }

      switch (config.order) {
        case DoctorSearchOrder.alphabetically:
          doctors = orderDoctorsAlphabetically(doctors);
          break;
        case DoctorSearchOrder.available:
          break;
        case DoctorSearchOrder.priceLowHigh:
          doctors = orderDoctorsByPriceLowHigh(doctors);
          break;
        case DoctorSearchOrder.priceHighLow:
          doctors = orderDoctorsByPriceLowHigh(doctors).reverse();
          break;
        default:
          doctors = orderDoctorsByDistance(doctors);
      }

      return { doctors };
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getMedicalConsultation(
    config: IPatientMedicalConsultationParams
  ): Promise<IPatientMedicalConsultationResponse> {
    const resultMedicalConsultation =
      await AppWrite.getDatabase().listDocuments("ehg_medical_consultation", [
        Query.equal("userId", config.userId),
      ]);

    if (resultMedicalConsultation.total < 1) throw Boom.notFound();

    try {
      const consultations = [];

      for (const document of resultMedicalConsultation.documents) {
        const obj: AppwriteDocument = document;

        const { date } = obj;
        if (typeof date !== "string") throw Boom.badData("No date found");

        const year = new Date(date).getUTCFullYear();

        if (year === config.medicalConsultationYear) {
          const month = new Date(date).toLocaleString("es-ES", {
            month: "long",
          });
          obj.month = month;
          consultations.push(medicalConsultationParser.parse(obj));
        }
      }

      return {
        userId: config.userId,
        consultations,
      };
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getFamiliarDiseases(
    config: IFamiliarDiseasesParams
  ): Promise<IFamiliarDiseasesResponse> {
    try {
      const resultFamiliarDiseases = await AppWrite.getDatabase().getDocument(
        "ehr_familiar_diseases",
        config.userId
      );
      return familiarDiseasesParser.parse(resultFamiliarDiseases);
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientExams(
    config: IPatientExamsParams
  ): Promise<IPatientExamsResponse> {
    const resultExams = await AppWrite.getDatabase().listDocuments(
      "ehr_exams",
      [Query.equal("userId", config.userId)]
    );

    const resultProcedures = await AppWrite.getDatabase().listDocuments(
      "ehr_procedures",
      [Query.equal("userId", config.userId)]
    );

    if (resultProcedures.total < 1 && resultExams.total < 1)
      throw Boom.notFound();

    try {
      const data = [];

      for (const document of resultExams.documents) {
        const obj = document as AppwriteDocument;
        const { result } = obj;
        if (typeof result !== "string") {
          throw Boom.badData("No familiar diseases records found");
        }

        data.push(
          examsParser.parse({
            ...obj,
            result: JSON.parse(result),
          })
        );
      }

      for (const document of resultProcedures.documents) {
        const obj = document as AppwriteDocument;
        data.push(examsParser.parse(obj));
      }

      data.sort((a, b): number => {
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
          return 1;
        }
        return -1;
      });
      return data;
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientAllergies(
    config: IPatientAllergiesParams
  ): Promise<IPatientAllergiesResponse> {
    try {
      const resultAllergies = await AppWrite.getDatabase().getDocument(
        "ehr_allergies",
        config.userId
      );
      const data: AppwriteDocument = resultAllergies;
      const { allergies } = data;

      if (typeof allergies !== "string")
        throw Boom.badData("No allergies found");

      return patientAllergiesParser.parse({
        ...data,
        allergies: JSON.parse(allergies),
      });
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientMeasurement(
    config: IPatientMeasurementParams
  ): Promise<IPatientMeasurementsResponse> {
    try {
      const resultMeasurements = await AppWrite.getDatabase().getDocument(
        "ehr_measurements",
        config.userId
      );
      const data: AppwriteDocument = resultMeasurements;
      const { records } = data;
      if (typeof records !== "string") throw Boom.badData("No records found");

      return patientMeasurementsParser.parse({
        ...data,
        records: JSON.parse(records),
      });
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientInfo(
    config: IPatientInfoParams
  ): Promise<IPatientInfoResponse> {
    try {
      const resultPatient = await AppWrite.getDatabase().getDocument(
        "patient",
        config.userId
      );
      return patientInfoParser.parse(resultPatient);
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientRecipiesAndPrescriptions(
    config: IPatientRecipiesAndPrescriptionsParams
  ): Promise<IPatientRecipiesAndPrescriptionsResponse> {
    const resultRecipes = await AppWrite.getDatabase().listDocuments(
      "ehr_recipes",
      [Query.equal("userId", config.userId)]
    );

    const resultPrescriptions = await AppWrite.getDatabase().listDocuments(
      "ehr_prescriptions",
      [Query.equal("userId", config.userId)]
    );

    if (resultRecipes.total < 1 && resultPrescriptions.total < 1)
      throw Boom.notFound();

    try {
      const data = [];

      for (const document of resultRecipes.documents) {
        const obj: AppwriteDocument = document;
        data.push(recipiesParser.parse(obj));
      }

      for (const document of resultPrescriptions.documents) {
        const obj: AppwriteDocument = document;
        data.push(prescriptionsParser.parse(obj));
      }

      data.sort((a, b): number => {
        if (
          new Date(a.reportDate).getTime() < new Date(b.reportDate).getTime()
        ) {
          return 1;
        }
        return -1;
      });

      return data;
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientRecipeOrPrescription(
    config: IPatientRecipeOrPrescriptionParams
  ): Promise<IPatientRecipeOrPrescriptionResponse> {
    const resultRecipes = await AppWrite.getDatabase().listDocuments(
      "ehr_recipes",
      [
        Query.equal("userId", config.userId),
        Query.equal("recipeId", config.recipePrescriptionId),
      ]
    );

    const resultPrescriptions = await AppWrite.getDatabase().listDocuments(
      "ehr_prescriptions",
      [
        Query.equal("userId", config.userId),
        Query.equal("prescriptionId", config.recipePrescriptionId),
      ]
    );

    if (resultRecipes.total < 1 && resultPrescriptions.total < 1)
      throw Boom.notFound();

    try {
      if (resultRecipes.total > 0) {
        const recipes: AppwriteDocument = resultRecipes.documents[0];
        return recipiesParser.parse(recipes);
      }
      if (resultPrescriptions.total > 0) {
        const presciptions: AppwriteDocument = resultPrescriptions.documents[0];
        return prescriptionsParser.parse(presciptions);
      }
      throw Boom.notFound("No recipe or prescription records found");
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientVaccines(
    config: IPatientVaccinesParams
  ): Promise<IPatientVaccinesResponse> {
    try {
      const resultVaccines = await AppWrite.getDatabase().getDocument(
        "ehr_vaccines",
        config.userId
      );
      const data: AppwriteDocument = resultVaccines;
      const { vaccines } = data;
      if (typeof vaccines !== "string") throw Boom.badData("No vaccines found");

      return patientVaccinesParser.parse({
        ...data,
        vaccines: JSON.parse(vaccines),
      });
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getPatientHabits(
    config: IPatientHabitsParams
  ): Promise<IPatientHabitsResponse> {
    try {
      const resultHabits = await AppWrite.getDatabase().getDocument(
        "ehr_habits",
        config.userId
      );
      const data: AppwriteDocument = resultHabits;
      const { smoking, alcoholism, physicalActivity, drugs } = data;

      if (typeof smoking !== "string") throw Boom.badData("No smoking found");
      if (typeof alcoholism !== "string")
        throw Boom.badData("No alcoholism found");
      if (typeof physicalActivity !== "string")
        throw Boom.badData("No physicalActivity found");
      if (typeof drugs !== "string") throw Boom.badData("No drugs found");

      return patientHabitsParser.parse({
        ...data,
        smoking: JSON.parse(smoking),
        alcoholism: JSON.parse(alcoholism),
        physicalActivity: JSON.parse(physicalActivity),
        drugs: JSON.parse(drugs),
      });
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getDiseaseHistory(
    config: IPatientDiseaseHistoryParams
  ): Promise<IPatientDiseaseHistoryResponse> {
    try {
      const resultDiseases = await AppWrite.getDatabase().getDocument(
        "ehr_diseases",
        config.userId
      );
      return disesaseHistoryParser.parse(resultDiseases);
    } catch (error) {
      if (error.code === 404) throw Boom.notFound();
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getSearchHistory(
    config: ISearchHistoryParams
  ): Promise<ISearchHistoryResponse> {
    const searchHistory = await AppWrite.getDatabase().listDocuments(
      "ehg_search_history",
      [Query.equal("userId", config.userId)]
    );
    if (searchHistory.total < 1) throw Boom.notFound();

    try {
      const data: AppwriteDocument = searchHistory.documents[0];
      const { searches } = data;

      if (typeof searches !== "string") throw Boom.badData("No searches found");

      return searchHistoryParser.parse({
        ...data,
        searches: JSON.parse(searches),
      });
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }

  async getDistricts(
    config: IGetDistrictsParams
  ): Promise<IGetDistrictsResponse> {
    const response = await this.client.post("/tercerNivelGeoAPI", {
      id_pais: config?.countryCode,
      codigoNivel2: config?.level2Code,
    });

    return response?.data;
  }

  async getProvinces(
    config: IGetProvincesParams
  ): Promise<IGetProvincesResponse> {
    const response = await this.client.post("/primerNivelGeoAPI", {
      id_pais: config?.countryCode,
    });

    return response?.data;
  }

  async getCantons(config: IGetCantonsParams): Promise<IGetCantonsResponse> {
    const response = await this.client.post("/segundoNivelGeoAPI", {
      id_pais: config?.countryCode,
      codigoNivel1: config?.level1Code,
    });

    return response?.data;
  }

  async getUserInfo(config: IGetUserInfoParams): Promise<IGetUserInfoResponse> {
    const response = await this.client.post("/validarPaciente", {
      id_institucion: config?.institutionId,
      tipo_id: config?.documentType,
      num_id: config?.documentNumber,
    });

    return response?.data;
  }

  async registerPatient(
    config: IRegisterPatientParams
  ): Promise<IRegisterPatientResponse> {
    try {
      const user = await AppWrite.getUserClient().create(
        "unique()",
        config.email,
        config.password,
        config.fullName
      );
      const userId = user.$id;

      const [firstName, firstLastName, secondLastName] =
        config.fullName.split(" ");

      await AppWrite.getDatabase().createDocument(
        "628694689d255b3b86ca",
        userId,
        {
          firstName,
          firstLastName,
          secondLastName,
          biologicalSex:
            config.biologicalSex === "1" ? "Femenino" : "Masculino",
          pronoun: config.pronoun,
          birthDate: config.birthDate,
          phoneNumbers: config.phoneNumbers,
          documentType: config.documentType,
          documentNumber: config.documentNumber,
          district: config.district,
          canton: config.canton,
          province: config.province,
          country: config.country,
        }
      );

      return {
        userId,
      };
    } catch (error) {
      if (error.code === 409) throw Boom.conflict("User already registered");
      throw Boom.boomify(error, { statusCode: 500 });
    }
  }
}
