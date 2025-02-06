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
