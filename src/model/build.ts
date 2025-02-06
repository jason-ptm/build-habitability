import { v4 as uuidv4 } from "uuid";
import {
  AIR_DENSITY,
  SPECIFIC_HEAT_CAPACITY,
  WallType,
} from "../constants/constants";
import { APP_DATA } from "../constants/data";
import { Ambient, AmbientInterface } from "./ambient";
import { Apartment } from "./apartment";
import { ApartmentWall } from "./apartmentWall";
import { PeopleActivity } from "./peopleActivity";
import { Wall } from "./wall";

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
          this.initializeWall(
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
  ): void {
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
      currentApartment.walls.right = apartmentWall;
      rightNeighbor.walls.left = apartmentWall;
    }

    // Wall at the back
    if (i < numRows - 1) {
      const backNeighbor = apartments[z][i + 1][j];
      const apartmentWall = new ApartmentWall(
        [currentApartment.id, backNeighbor.id],
        wallConstant,
        WallType.WALL
      );
      currentApartment.walls.back = apartmentWall;
      backNeighbor.walls.front = apartmentWall;
    }

    // Ceiling
    if (z < numFloors - 1) {
      const ceilingNeighbor = apartments[z + 1][i][j];
      const apartmentWall = new ApartmentWall(
        [currentApartment.id, ceilingNeighbor.id],
        floorConstant,
        WallType.FLOOR_CEILING
      );
      currentApartment.walls.ceiling = apartmentWall;
      ceilingNeighbor.walls.floor = apartmentWall;
    }
  }

  calculateTemperaturesForTime(
    t: number,
    externalTemperature: number,
    apartments: Apartment[][][]
  ) {
    for (let z = 0; z < apartments.length; z++) {
      for (let i = 0; i < apartments[z].length; i++) {
        for (let j = 0; j < apartments[z][i].length; j++) {
          const apartment = apartments[z][i][j];
          apartment.calculateInternalTemperature(externalTemperature, t);
          apartments[z][i][j].temperature =
            apartment.calculateTemperatureWithActivities(
              externalTemperature,
              t
            );
        }
      }
    }

    // Propagate heat to neighboring apartments
    return this.propagateHeat(apartments, t);
  }

  private propagateHeat(apartments: Apartment[][][], time: number) {
    const deltas = new Map<string, number>();

    // Calcular todos los cambios primero
    for (let z = 0; z < apartments.length; z++) {
      for (let i = 0; i < apartments[z].length; i++) {
        for (let j = 0; j < apartments[z][i].length; j++) {
          const apartment = apartments[z][i][j];
          const neighbors = this.getNeighbors(apartments, z, i, j);

          neighbors.forEach((neighbor) => {
            const { sourceDelta, targetDelta } = this.calculateHeatTransfer(
              apartment,
              neighbor,
              time
            );

            // Acumular cambios para evitar interferencias
            deltas.set(
              apartment.id,
              (deltas.get(apartment.id) || 0) + sourceDelta
            );
            deltas.set(
              neighbor.id,
              (deltas.get(neighbor.id) || 0) + targetDelta
            );
          });
        }
      }
    }

    // Aplicar cambios acumulados
    deltas.forEach((delta, apartmentId) => {
      const apartment = this.findApartmentById(apartments, apartmentId);
      if (apartment) {
        apartment.temperature += delta;
      }
    });

    return apartments;
  }

  // Función auxiliar para encontrar un apartamento por ID
  private findApartmentById(
    apartments: Apartment[][][],
    id: string
  ): Apartment | undefined {
    for (const floor of apartments) {
      for (const row of floor) {
        for (const apartment of row) {
          if (apartment.id === id) {
            return apartment;
          }
        }
      }
    }
    return undefined;
  }

  // Función auxiliar para obtener vecinos
  private getNeighbors(
    apartments: Apartment[][][],
    z: number,
    i: number,
    j: number
  ): Apartment[] {
    const neighbors: Apartment[] = [];
    const directions = [
      { z, i: i - 1, j }, // Front
      { z, i: i + 1, j }, // Back
      { z, i, j: j - 1 }, // Left
      { z, i, j: j + 1 }, // Right
      { z: z - 1, i, j }, // Floor
      { z: z + 1, i, j }, // Ceiling
    ];

    directions.forEach((dir) => {
      if (
        dir.z >= 0 &&
        dir.z < apartments.length &&
        dir.i >= 0 &&
        dir.i < apartments[0].length &&
        dir.j >= 0 &&
        dir.j < apartments[0][0].length
      ) {
        neighbors.push(apartments[dir.z][dir.i][dir.j]);
      }
    });

    return neighbors;
  }

  private calculateHeatTransfer(
    source: Apartment,
    target: Apartment,
    time: number
  ): { sourceDelta: number; targetDelta: number } {
    // 1. Encontrar la pared compartida (vertical u horizontal)
    const sharedWall = this.findSharedWall(source, target);
    if (!sharedWall) return { sourceDelta: 0, targetDelta: 0 };

    // 2. Calcular diferencia de temperatura
    const deltaTemp = source.temperature - target.temperature;
    if (deltaTemp === 0) return { sourceDelta: 0, targetDelta: 0 };

    // 3. Parámetros de la pared
    const k = sharedWall.wall.material.coeficienteConductividad;
    const A = sharedWall.area; // Área ya calculada según tipo de pared
    const d = sharedWall.wall.thickness;
    const t = time;

    // 4. Calcular calor transferido (Q)
    const Q = (k * A * Math.abs(deltaTemp) * t) / d;
    const QDirection = deltaTemp > 0 ? Q : -Q; // Dirección del flujo

    // 5. Calcular masa térmica de ambos apartamentos
    const sourceThermalMass =
      source.volume * AIR_DENSITY * SPECIFIC_HEAT_CAPACITY;
    const targetThermalMass =
      target.volume * AIR_DENSITY * SPECIFIC_HEAT_CAPACITY;

    // 6. Calcular cambios de temperatura
    const sourceDelta = -QDirection / sourceThermalMass; // Fuente pierde calor
    const targetDelta = QDirection / targetThermalMass; // Vecino gana calor

    return { sourceDelta, targetDelta };
  }

  // Función auxiliar para encontrar la pared compartida
  private findSharedWall(
    source: Apartment,
    target: Apartment
  ): ApartmentWall | null {
    const walls = Object.values(source.walls) as ApartmentWall[];
    for (const wall of walls) {
      if (wall && wall.apartments.includes(target.id)) {
        return wall;
      }
    }
    return null;
  }
}

// Asumimos que `calculateTemperatureWithActivities` y `calculateAmbientTemperature` son métodos válidos en respectivas clases
export interface BuildInterface {
  id: string;
  name: string;
  ambient: AmbientInterface;
}
