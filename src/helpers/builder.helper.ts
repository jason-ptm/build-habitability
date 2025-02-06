import { ApartmentInterface } from "../model/apartment";
import { ApartmentWall } from "../model/apartmentWall";
import { Apartment } from "../model/apartment";
import { WallType } from "../constants/constants";
import { Wall } from "../model/wall";

export const buildApartmentsWalls = (
  apartments: ApartmentInterface[],
  wallPrototype: Wall,
  wallType: WallType
) => {
  const apartmentsByFloor: Map<number, ApartmentInterface[]> = new Map();

  apartments.forEach((apartment) => {
    if (!apartmentsByFloor.has(apartment.floor)) {
      apartmentsByFloor.set(apartment.floor, []);
    }
    apartmentsByFloor.get(apartment.floor)?.push(apartment);
  });

  apartmentsByFloor.forEach((apartmentsOnFloor) => {
    apartmentsOnFloor.sort((a, b) => a.number - b.number);
    for (let i = 0; i < apartmentsOnFloor.length - 1; i++) {
      const apartment1 = new Apartment(
        apartmentsOnFloor[i].number,
        apartmentsOnFloor[i].floor
      );
      const apartment2 = new Apartment(
        apartmentsOnFloor[i + 1].number,
        apartmentsOnFloor[i + 1].floor
      );

      const sharedWall = new ApartmentWall(
        [apartment1, apartment2],
        wallPrototype,
        wallType
      );
      apartment1.addWalls(sharedWall);
      apartment2.addWalls(sharedWall);
    }
  });

  return apartmentsByFloor;
};
