import { v4 as uuidv4 } from "uuid";

export class Material {
  id: string;
  name: string;
  temperatureResistance: number;
  coeficienteConductividad: number;

  constructor(
    name: string,
    temperatureResistance: number,
    coeficienteConductividad: number
  ) {
    this.id = uuidv4();
    this.name = name;
    this.temperatureResistance = temperatureResistance;
    this.coeficienteConductividad = coeficienteConductividad;
  }
}

export interface MaterialInterface {
  id: string;
  name: string;
  temperatureResistance: number;
}
