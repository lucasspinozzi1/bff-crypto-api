import { TypeParse, Types as T } from "typeparse";

const familiarDiseasesParser = new TypeParse(
  T.Object({
    diseases: T.Object({
      diabetes: T.Array(T.String(), "diabetes"),
      highPressure: T.Array(T.String(), "highPressure"),
      cancer: T.Array(T.String(), "cancer"),
      heartDisease: T.Array(T.String(), "heartDisease"),
      mentalDiseases: T.Array(T.String(), "mentalDiseases"),
      alzheimer: T.Array(T.String(), "alzheimer"),
      depression: T.Array(T.String(), "depression"),
      anxiety: T.Array(T.String(), "anxiety"),
      personalityProblems: T.Array(T.String(), "personalityProblems"),
      stroke: T.Array(T.String(), "stroke"),
      epilepsy: T.Array(T.String(), "epilepsy"),
      tuberculosis: T.Array(T.String(), "tuberculosis"),
    }),
    details: T.String(),
  })
);

const disesaseHistoryParser = new TypeParse(
  T.Object({
    childhood: T.Array(T.String()),
    adulthood: T.Array(T.String()),
  })
);

const examsParser = new TypeParse(
  T.Object({
    userId: T.String(),
    id: T.String("$id"),
    type: T.String(),
    name: T.String(),
    date: T.String(),
    performer: T.String(),
    result: T.Union([
      T.String(),
      T.Array(
        T.Object({
          name: T.String(),
          value: T.String(),
          unit: T.String(),
          referenceRange: T.String(),
        })
      ),
    ]).optional(),
    procedureZone: T.String().optional(),
    diagnostic: T.String().optional(),
    interpretation: T.String().optional(),
  })
);

const patientAllergiesParser = new TypeParse(
  T.Object({
    allergies: T.Array(
      T.Object({
        id: T.String(),
        isActive: T.Boolean(),
        time: T.String(),
        startDate: T.String(),
        endDate: T.String().optional(),
        description: T.String(),
        comments: T.String(),
        reportedBy: T.String(),
        performer: T.String(),
        specialization: T.String(),
      })
    ),
  })
);

const patientMeasurementsParser = new TypeParse(
  T.Object({
    records: T.Array(
      T.Object({
        name: T.String(),
        type: T.String(),
        unit: T.String(),
        measurements: T.Array(
          T.Object({
            id: T.String(),
            time: T.String(),
            performer: T.String(),
            value: T.Number().optional(),
            systolic: T.Number().optional(),
            diastolic: T.Number().optional(),
          })
        ),
      })
    ),
  })
);

const patientVaccinesParser = new TypeParse(
  T.Object({
    registeredBy: T.String(),
    schema: T.String(),
    vaccines: T.Array(
      T.Object({
        name: T.String(),
        vaccineId: T.String(),
        regular: T.Array(
          T.Object({
            dose: T.String(),
            date: T.String(),
            applied: T.Boolean(),
          })
        ),
        reinforcement: T.Array(
          T.Object({
            dose: T.String(),
            date: T.String(),
            applied: T.Boolean(),
          })
        ),
        extra: T.Array(
          T.Object({
            dose: T.String(),
            date: T.String(),
            applied: T.Boolean(),
          })
        ),
      })
    ),
  })
);

const patientHabitsParser = new TypeParse(
  T.Object({
    smoking: T.Object({
      id: T.String(),
      status: T.Boolean(),
      addictionStatus: T.String(),
      passive: T.Boolean(),
      quantity: T.String(),
      frequency: T.String(),
      period: T.String(),
      wantsToQuit: T.Boolean(),
    }),
    alcoholism: T.Object({
      id: T.String(),
      status: T.Boolean(),
      addictionStatus: T.String(),
      quantity: T.String(),
      frequency: T.String(),
      period: T.String(),
      wantsToQuit: T.Boolean(),
    }),
    physicalActivity: T.Object({
      id: T.String(),
      type: T.String(),
      duration: T.String(),
      frequency: T.String(),
      details: T.String(),
    }),
    drugs: T.Array(
      T.Object({
        id: T.String(),
        name: T.String(),
        observation: T.String(),
      })
    ),
  })
);

const searchHistoryParser = new TypeParse(
  T.Object({
    userId: T.String(),
    searches: T.Array(
      T.Object({
        doctorId: T.String(),
        doctorName: T.String(),
        medicalSpeciality: T.String(),
        date: T.String(),
      })
    ),
  })
);

const recipiesParser = new TypeParse(
  T.Object({
    userId: T.String(),
    id: T.String("recipeId"),
    type: T.String(),
    details: T.Object({
      description: T.String("description"),
      indications: T.String("indications"),
    }),
    reportDate: T.String(),
    reporter: T.Object({
      name: T.String("reportName"),
      speciality: T.String("reportSpeciality"),
    }),
  })
);

const prescriptionsParser = new TypeParse(
  T.Object({
    userId: T.String(),
    id: T.String("prescriptionId"),
    type: T.String(),
    details: T.Object({
      drug: T.String("drug"),
      power: T.Number("power"),
      take: T.Number("take"),
      frequency: T.String("frequency"),
      quantity: T.Number("quantity"),
      via: T.String("via"),
      days: T.Number("days"),
      indications: T.String("indications"),
      status: T.String("status"),
      statusDate: T.String("statusDate"),
    }),
    reportDate: T.String(),
    reporter: T.Object({
      name: T.String("reportName"),
      speciality: T.String("reportSpeciality"),
    }),
  })
);

const medicalConsultationParser = new TypeParse(
  T.Object({
    medicalConsultationId: T.String("medicalConsultationId"),
    month: T.String("month"),
    name: T.String("name"),
    doctor: T.String("doctor"),
    reason: T.String("reason"),
    healthSite: T.String("healthSite"),
    date: T.String("date"),
  })
);

const medicalInstitutionParser = new TypeParse(
  T.Object({
    name: T.String(),
    externalId: T.String(),
    latitude: T.String(),
    longitude: T.String(),
    province: T.String(),
    canton: T.String(),
    district: T.String(),
  })
);

const doctorsParser = new TypeParse(
  T.Object({
    doctorId: T.String("$id"),
    name: T.String(),
    speciality: T.String(),
    info: T.String(),
    medicalInstitutions: T.Array(
      T.Object({
        id: T.String("id"),
        name: T.String("hospital"),
        externalId: T.String("externalId"),
        latitude: T.Number("latitude"),
        longitude: T.Number("longitude"),
        province: T.String("province"),
        canton: T.String("canton"),
        district: T.String("district"),
      }),
      "medicalInstitutions"
    ),
    price: T.String(),
    telephone: T.String(),
    schedule: T.String(),
    web: T.String(),
    email: T.String(),
    acceptVirtual: T.Boolean(),
    patientVirtualLink: T.String(),
    doctorVirtualLink: T.String(),
  })
);
const patientInfoParser = new TypeParse(
  T.Object({
    firstName: T.String(),
    firstLastName: T.String(),
    secondLastName: T.String(),
    birthDate: T.String(),
    height: T.Number(),
    weight: T.Number(),
    biologicSex: T.String(),
    pronoun: T.String(),
    civilStatus: T.String(),
    ocupation: T.String(),
    address: T.String(),
  })
);

export {
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
  medicalInstitutionParser,
  patientInfoParser,
};
