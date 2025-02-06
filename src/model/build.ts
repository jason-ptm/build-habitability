import { v4 as uuidv4 } from "uuid";
import {
  AIR_DENSITY,
  SPECIFIC_HEAT_CAPACITY,
  WallType,
} from "../constants/constants";
import { APP_DATA } from "../constants/data";
import { Ambient, AmbientInterface } from "./ambient";
import { Apartment, WallImplementationInterface } from "./apartment";
import { ApartmentWall, ApartmentWallInterface } from "./apartmentWall";
import { PeopleActivity } from "./peopleActivity";
import { Wall } from "./wall";
import { getApartmentTemperatureWithActivities } from "../utils/apartment";

interface Neighborhood {
  apartments: Apartment[];
  externalTemperature: number;
}

export class Building {
  id: string;
  floors: number;
  apartmentsPerFloor: number;
  building: Apartment[][][];
  name: string;
  ambient: Ambient;

  constructor(
    floors: number,
    apartmentsPerFloor: number,
    name: string,
    ambient: Ambient
  ) {
    this.id = uuidv4();
    this.floors = floors;
    this.apartmentsPerFloor = apartmentsPerFloor;
    this.building = [];
    this.name = name;
    this.ambient = ambient;
  }

  poblateBuilding(
    apartments: Apartment[][][],
    activities: PeopleActivity[]
  ): Apartment[][][] {
    const numFloors = apartments.length;
    const numRows = apartments[0]?.length;
    const numCols = apartments[0][0].length;

    const wallConstant = new Wall(
      APP_DATA.walls[1].material,
      APP_DATA.walls[1].thickness
    );

    const floorConstant = new Wall(
      APP_DATA.walls[0].material,
      APP_DATA.walls[0].thickness
    );

    for (let z = 0; z < numFloors; z++) {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const currentApartment = apartments[z][i][j];
          apartments[z][i][j].residents?.map((resident) => {
            resident.activities = resident.activities.map((activity) => {
              const tempActivity = activities?.find(
                (a) => a.id === activity.id
              );
              if (tempActivity) {
                return tempActivity;
              }
              return activity;
            });
          });

          // Initialize walls
          apartments[z][i][j] = this.initializeWall(
            currentApartment,
            apartments,
            z,
            i,
            j,
            wallConstant,
            floorConstant
          );
        }
      }
    }

    return apartments;
  }

  private initializeWall(
    currentApartment: Apartment,
    apartments: Apartment[][][],
    z: number,
    i: number,
    j: number,
    wallConstant: Wall,
    floorConstant: Wall
  ) {
    const numFloors = apartments.length;
    const numRows = apartments[0].length;
    const numCols = apartments[0][0].length;

    // Wall to the right
    if (j < numCols - 1) {
      const rightNeighbor = apartments[z][i][j + 1];
      const apartmentWall = new ApartmentWall(
        [currentApartment.id, rightNeighbor.id],
        wallConstant,
        WallType.WALL
      );
      currentApartment.neighbors.right = rightNeighbor.id;
      currentApartment.walls.right = apartmentWall;
      rightNeighbor.walls.left = apartmentWall;
      rightNeighbor.neighbors.right = currentApartment.id;
    }

    // Wall at the back
    if (i < numRows - 1) {
      const backNeighbor = apartments[z][i + 1][j];
      const apartmentWall = new ApartmentWall(
        [currentApartment.id, backNeighbor.id],
        wallConstant,
        WallType.WALL
      );
      currentApartment.neighbors.back = backNeighbor.id;
      currentApartment.walls.back = apartmentWall;
      backNeighbor.walls.front = apartmentWall;
      backNeighbor.neighbors.back = currentApartment.id;
    }

    // Ceiling
    if (z < numFloors - 1) {
      const ceilingNeighbor = apartments[z + 1][i][j];
      const apartmentWall = new ApartmentWall(
        [currentApartment.id, ceilingNeighbor.id],
        floorConstant,
        WallType.FLOOR_CEILING
      );
      currentApartment.neighbors.ceiling = ceilingNeighbor.id;
      currentApartment.walls.ceiling = apartmentWall;
      ceilingNeighbor.walls.floor = apartmentWall;
      ceilingNeighbor.neighbors.ceiling = currentApartment.id;
    }

    return currentApartment;
  }

  caclulateApartmentsTemperature(
    apartaments: Apartment[][][],
    externalTemperature: number
  ): Apartment[][][] {
    const neighborhoodApartments: Apartment[] = [];
    for (const floor of apartaments) {
      for (const row of floor) {
        for (const apartment of row) {
          const { temperature, residents } =
            getApartmentTemperatureWithActivities(apartment);
          apartment.temperature = temperature;
          apartment.residents = residents;
          neighborhoodApartments.push(apartment);
        }
      }
    }

    const neighborhood: Neighborhood = {
      apartments: neighborhoodApartments,
      externalTemperature,
    };

    console.log(
      this.propagateTemperature(externalTemperature, neighborhood, 600)
    );

    return apartaments;
  }

  propagateTemperature(
    externalTemperature: number,
    neighborhood: Neighborhood,
    timeStep: number
  ): Apartment[] {
    const specificHeatCapacity = 1005; // J/kg·K, para aire
    const airDensity = 1.225; // kg/m³, para aire
    const roomVolume = 100; // Volumen asumido para simplificación

    neighborhood.apartments.forEach((apartment) => {
      let netHeatTransfer = 0;

      // Calcular transferencia de calor con el ambiente externo
      for (const [direction, wall] of Object.entries(apartment.walls)) {
        const externalHeatTransfer =
          wall.wall.material.coeficienteConductividad *
          (neighborhood.externalTemperature - apartment.temperature);
        netHeatTransfer += externalHeatTransfer;
      }

      // Calcular transferencia de calor con los apartamentos vecinos
      for (const [direction, neighborId] of Object.entries(
        apartment.neighbors
      )) {
        const neighboringApartment = neighborhood.apartments.find(
          (ap) => ap.id === neighborId
        );
        if (neighboringApartment && !isNaN(neighboringApartment.temperature)) {
          const wall =
            apartment.walls[direction as keyof WallImplementationInterface];
          const neighborHeatTransfer =
            wall.wall.material.coeficienteConductividad *
            (neighboringApartment.temperature - apartment.temperature);
          netHeatTransfer += neighborHeatTransfer;
        } else {
          const neighborHeatTransfer =
            apartment.walls.floor.wall.material.coeficienteConductividad *
            (externalTemperature - apartment.temperature);
          netHeatTransfer += neighborHeatTransfer;
        }
      }

      // Actualizar temperatura interna del apartamento considerando el neto de transferencia de calor
      const deltaT =
        (netHeatTransfer * timeStep) /
        (specificHeatCapacity * roomVolume * airDensity);
      apartment.temperature += deltaT;
    });

    return neighborhood.apartments;
  }
}

// Asumimos que `calculateTemperatureWithActivities` y `calculateAmbientTemperature` son métodos válidos en respectivas clases
export interface BuildInterface {
  id: string;
  name: string;
  ambient: AmbientInterface;
}
