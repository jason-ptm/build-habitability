import { v4 as uuidv4 } from "uuid";
import {
  AIR_DENSITY,
  DEFAULT_WALL_HEIGHT,
  DEFAULT_WALL_WIDTH,
  SPECIFIC_HEAT_CAPACITY,
  WallType,
} from "../constants/constants";
import { Wall, WallInterface } from "./wall";

export class ApartmentWall {
  id: string;
  apartments: string[];
  type: WallType;
  wall: Wall;
  height: number = DEFAULT_WALL_HEIGHT;
  width: number = DEFAULT_WALL_WIDTH;

  constructor(apartments: string[], wall: Wall, type: WallType) {
    this.id = uuidv4();
    this.apartments = apartments;
    this.type = type;
    this.wall = wall;
  }

  get area(): number {
    return this.height * this.width;
  }

  calculateTemperatureByRadiation(
    externalTemperature: number,
    initialInternalTemperature: number,
    time: number
  ): number {
    const totalArea = 2 * (this.height * this.width);

    const volume = this.height * this.width * this.width;
    const a =
      (this.wall.material.temperatureResistance * totalArea) /
      (this.wall.thickness * AIR_DENSITY * SPECIFIC_HEAT_CAPACITY * volume);

    const internalTemperature =
      externalTemperature -
      (externalTemperature - initialInternalTemperature) * Math.exp(-a * time);

    const adjustedTemperature = internalTemperature;

    return adjustedTemperature;
  }
}

export interface ApartmentWallInterface {
  id: string;
  apartments: String[];
  type: WallType;
  wall: WallInterface;
}
