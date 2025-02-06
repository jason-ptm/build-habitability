import moment from "moment";
import { Apartment } from "../model/apartment";

export interface ApartmentNode {
  apartment: Apartment;
  neighbors: ApartmentNode[];
}

export const getTimeAsDecimal = (time: string): number => {
  const hours = moment(time).hours();
  const minutes = moment(time).minutes();

  return hours + minutes / 60;
};
