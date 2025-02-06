import { APP_DATA } from "../constants/data";
import { StateInterface } from "../context";
import { Ambient } from "../model/ambient";
import { Building } from "../model/build";

export const getInitData = (): StateInterface => {
  const build = new Building(
    3,
    4,
    APP_DATA.build.name,
    new Ambient(APP_DATA.ambient[0].name, APP_DATA.ambient[0].formule)
  );
  build.poblateBuilding(APP_DATA.apartments);
  const data: StateInterface = {
    ...APP_DATA,
    build,
  };
  return data;
};
