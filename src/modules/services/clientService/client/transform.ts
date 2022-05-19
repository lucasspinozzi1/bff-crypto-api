/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Boom from "@hapi/boom";
import { headingDistanceTo } from "geolocation-utils";
import { IDoctor } from "../../types";

export function calculateMedicalInstitutionDistance(
  doctors: IDoctor[],
  latitude: string,
  longitude: string
) {
  const origin = { lat: parseFloat(latitude), lon: parseFloat(longitude) };
  const doctorResult: IDoctor[] = [];
  for (const doctor of doctors) {
    doctor.medicalInstitutions = doctor.medicalInstitutions.map(
      (institution) => {
        const institutionWithDistance = institution;
        institutionWithDistance.distance = Number(
          headingDistanceTo(origin, {
            lat: institution.latitude,
            lon: institution.longitude,
          }).distance.toFixed(2)
        );
        return institutionWithDistance;
      }
    );
    doctorResult.push(doctor);
  }
  return doctorResult;
}

export function orderDoctorsByDistance(doctors: IDoctor[]) {
  doctors.sort((a, b): number => {
    if (
      a.medicalInstitutions[0].distance &&
      b.medicalInstitutions[0].distance
    ) {
      return (
        a.medicalInstitutions[0].distance - b.medicalInstitutions[0].distance
      );
    }
    throw Boom.badImplementation("No distance available");
  });
  return doctors;
}

export function orderDoctorsByPriceLowHigh(doctors: IDoctor[]) {
  return doctors.sort((a, b): number => Number(a.price) - Number(b.price));
}

export function orderDoctorsAlphabetically(doctors: IDoctor[]) {
  return doctors.sort((a, b): number => {
    if (a.name > b.name) return 1;
    return -1;
  });
}

export function filterGeolocation(doctors: IDoctor[], range: number) {
  const validDoctors = [];
  for (const doctor of doctors) {
    doctor.medicalInstitutions = doctor.medicalInstitutions.filter((value) => {
      if (value.distance) {
        return value.distance <= range;
      }
      return false;
    });
    doctor.medicalInstitutions.sort((a, b): number => {
      if (a.distance && b.distance) {
        return a.distance - b.distance;
      }
      return 1;
    });
    if (doctor.medicalInstitutions.length > 0) {
      validDoctors.push(doctor);
    }
  }
  return validDoctors;
}
