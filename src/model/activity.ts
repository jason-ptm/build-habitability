import { v4 as uuidv4 } from "uuid";

export class Activity {
  id: string;
  name: string;
  temperature: number;
  durability: number;

  constructor(name: string, temperature: number, durability: number) {
    this.id = uuidv4();
    this.name = name;
    this.temperature = temperature;
    this.durability = durability;
  }
}

export interface ActivityInterface {
  id: string;
  name: string;
  temperature: number;
  durability: number;
}
