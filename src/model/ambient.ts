import { v4 as uuidv4 } from "uuid";

export class Ambient {
  id: string;
  name: string;
  formule: string;

  constructor(name: string, formule: string) {
    this.id = uuidv4();
    this.name = name;
    this.formule = formule;
  }

  calculateTemperature(time: number) {
    const formule = this.formule.replace(/x/g, time.toString());
    return eval(formule);
  }
}

export interface AmbientInterface {
  id: string;
  name: string;
  formule: string;
}
