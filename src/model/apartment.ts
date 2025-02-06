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

interface directionIDs {
  right: string;
  left: string;
  front: string;
  back: string;
  floor: string;
  ceiling: string;
}

export class Apartment {
  id: string;
  number: number;
  floorNumber: number;
  residents: People[];
  code: string;
  livingStatus: ApartmentLivingStatus;
  temperature: number = DEFAULT_INTERNAL_TEMPERATURE;
  walls: WallImplementationInterface;
  neighbors: directionIDs = {
    right: "",
    left: "",
    front: "",
    back: "",
    floor: "",
    ceiling: "",
  };

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
