export interface RouteType {
  path: string;
  label: string;
  absolutePath: string;
  extraPaths?: RouteType[];
}

export const RoutePaths = {
  HOME: {
    path: "home",
    label: "Inicio",
    absolutePath: "/home",
  },
  SOLUTION: {
    path: "solution",
    label: "Solución",
    absolutePath: "/solution",
  },
  CONFIGURATION: {
    path: "configuration",
    label: "Configuración",
    absolutePath: "/configuration",
    extraPaths: {
      ACTIVITY: {
        path: "activity",
        label: "Actividades",
        absolutePath: "/configuration/activity",
      },
      AMBIENT: {
        path: "ambient",
        label: "Ambiente",
        absolutePath: "/configuration/ambient",
      },
      APARTMENT: {
        path: "apartment",
        label: "Apartamento",
        absolutePath: "/configuration/apartment",
      },
      BUILD: {
        path: "build",
        label: "Edificio",
        absolutePath: "/configuration/build",
      },
      PEOPLE: {
        path: "people",
        label: "Personas",
        absolutePath: "/configuration/people",
      },
      MATERIAL: {
        path: "material",
        label: "Materiales",
        absolutePath: "/configuration/material",
      },
      WALL: {
        path: "wall",
        label: "Muro",
        absolutePath: "/configuration/wall",
      },
    },
  },
};
