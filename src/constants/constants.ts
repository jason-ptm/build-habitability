export enum WallType {
  WALL = "Wall",
  FLOOR_CEILING = "Floor",
}

export enum ApartmentLivingStatus {
  HABITABLE = "Habitable",
  UNINHABITABLE = "Uninhabitable",
}

export enum ActivityStatusEnum {
  UNKOWN = "Unknown",
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export enum TemperatureStandardEnum {
  LOW = 12,
  HIGH = 26,
}

export const DEFAULT_THICKNESS = 0.18;
export const DEFAULT_WALL_HEIGHT = 3;
export const DEFAULT_WALL_WIDTH = 6;
export const DEFAULT_INTERNAL_TEMPERATURE = 20;
export const AIR_DENSITY = 1.225;
export const SPECIFIC_HEAT_CAPACITY = 1005;
