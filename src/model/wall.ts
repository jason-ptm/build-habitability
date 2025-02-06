import { v4 as uuidv4 } from "uuid";
import { Material, MaterialInterface } from "./material";

export class Wall {
  id: string;
  material: Material;
  thickness: number;

  constructor(material: Material, thickness: number) {
    this.id = uuidv4();
    this.material = material;
    this.thickness = thickness;
  }
}

export interface WallInterface {
  id: string;
  material: MaterialInterface;
  thickness: number;
}
