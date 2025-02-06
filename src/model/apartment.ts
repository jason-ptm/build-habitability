import { v4 as uuidv4 } from "uuid";
import {
  ActivityStatusEnum,
  ApartmentLivingStatus,
  DEFAULT_INTERNAL_TEMPERATURE,
} from "../constants/constants";
import { ApartmentWall, ApartmentWallInterface } from "./apartmentWall";
import { People, PeopleInterface } from "./people";

export interface WallImplementationInterface {
  front: ApartmentWall;
  back: ApartmentWall;
  left: ApartmentWall;
  right: ApartmentWall;
  floor: ApartmentWall;
  ceiling: ApartmentWall;
}

export class Apartment {
  id: string;
  number: number;
  floorNumber: number;
  residents: People[];
  code: string;
  livingStatus: ApartmentLivingStatus;
  temperature: number = 0;
  walls: WallImplementationInterface;

  constructor(
    number: number,
    floor: number,
    resident: People[] = [],
    livingStatus: ApartmentLivingStatus = ApartmentLivingStatus.HABITABLE,
    walls: WallImplementationInterface
  ) {
    this.id = uuidv4();
    this.number = number;
    this.floorNumber = floor;
    this.residents = resident;
    this.code = `${floor}0${number}`;
    this.livingStatus = livingStatus;
    this.walls = walls;
  }

  get volume(): number {
    return (
      this.walls.right.width * this.walls.front.width * this.walls.front.width
    );
  }

  calculateInternalTemperature(
    externalTemperature: number,
    time: number
  ): Apartment {
    const initialInternalTemperature = this.temperature;
    let totalTemperature = 0;
    let wallCount = 0;

    for (const key in this.walls) {
      if (Object.prototype.hasOwnProperty.call(this.walls, key)) {
        const wall = this.walls[key as keyof WallImplementationInterface];
        const wallTemperature = wall.calculateTemperatureByRadiation(
          externalTemperature,
          initialInternalTemperature,
          time
        );
        totalTemperature += wallTemperature;
        wallCount += 1;
      }
    }

    const averageTemperature = totalTemperature / wallCount;
    this.temperature = Number(averageTemperature.toFixed(2));
    return this;
  }

  calculateTemperatureWithActivities(
    externalTemperature: number,
    time: number
  ): number {
    let effectiveActivityTemperatureIncrease = 0;

    this.residents.forEach((resident) => {
      resident.activities.forEach((activity) => {
        if (activity.status === ActivityStatusEnum.IN_PROGRESS) {
          effectiveActivityTemperatureIncrease += activity.activity.temperature;
        }
      });
    });

    const totalInternalTemperatureIncrease =
      effectiveActivityTemperatureIncrease;

    const validTemperature =
      this.temperature === 0 ? DEFAULT_INTERNAL_TEMPERATURE : this.temperature;

    let resultantTemperature =
      validTemperature + totalInternalTemperatureIncrease;

    // Recalcula temperatura considerando radiación
    for (const wallDirection in this.walls) {
      const wall =
        this.walls[wallDirection as keyof WallImplementationInterface];
      resultantTemperature = wall.calculateTemperatureByRadiation(
        externalTemperature,
        resultantTemperature,
        time
      );
    }

    this.temperature = Number(resultantTemperature.toFixed(2));
    console.log(
      "🚀 ~ Apartment ~ resultantTemperature:",
      this.code,
      resultantTemperature
    );

    return Number(resultantTemperature.toFixed(2));
  }
}

export interface ApartmentInterface {
  id: string;
  number: number;
  floor: number;
  resident: PeopleInterface[];
  code: string;
  livingStatus: ApartmentLivingStatus;
  walls: ApartmentWallInterface[];
  temperature: number;
}
