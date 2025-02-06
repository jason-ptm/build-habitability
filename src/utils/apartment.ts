import { ActivityStatusEnum } from "../constants/constants";
import { Apartment } from "../model/apartment";

export const findApartmentByActivityId = (
  apartments: Apartment[][][],
  activityId: string
): Apartment | undefined => {
  let wantedApartment: Apartment | undefined;
  for (const floor of apartments) {
    for (const row of floor) {
      for (const apartment of row) {
        apartment.residents.forEach((resident) => {
          if (
            resident.activities.some((activity) => activity.id === activityId)
          ) {
            wantedApartment = apartment;
          }
        });
      }
    }
  }

  return wantedApartment;
};

export const getApartmentTemperatureWithActivities = (apartment: Apartment) => {
  let apartmentTemperature = apartment.temperature;

  apartment.residents.forEach((resident) => {
    resident.activities.forEach((activity) => {
      if (
        activity.status === ActivityStatusEnum.IN_PROGRESS &&
        !activity.calculed
      ) {
        apartmentTemperature += activity.activity.temperature;
        activity.calculed = true;
      }
    });
  });

  apartment.temperature = apartmentTemperature;

  return { temperature: apartment.temperature, residents: apartment.residents };
};

export const runApartmentsMatriz = (
  matriz: Apartment[][][],
  handler: (apartment: Apartment) => any
) => {
  for (const floor of matriz) {
    for (const row of floor) {
      for (const apartment of row) {
        handler(apartment);
      }
    }
  }
};
