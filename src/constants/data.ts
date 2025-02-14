import moment from "moment";
import { StateInterface } from "../context";
import { Activity } from "../model/activity";
import { Ambient } from "../model/ambient";
import { Apartment } from "../model/apartment";
import { ApartmentWall } from "../model/apartmentWall";
import { Building } from "../model/build";
import { Material } from "../model/material";
import { People } from "../model/people";
import {
  PeopleActivity,
  PeopleActivityInterface,
} from "../model/peopleActivity";
import { Wall } from "../model/wall";
import {
  ActivityStatusEnum,
  ApartmentLivingStatus,
  WallType,
} from "./constants";

const getPeopleActivities = (
  activities: Array<PeopleActivityInterface>
): Array<PeopleActivityInterface> => {
  const peopleActivities = activities.map((activity) => {
    activity.endTime = moment(activity.startTime)
      .add(activity.activity.durability, "minutes")
      .toString();

    const isInProgress = moment().isBetween(
      moment(activity.startTime),
      moment(activity.endTime)
    );
    const isDone = moment().isAfter(moment(activity.endTime));
    const isPending = moment().isBefore(moment(activity.startTime));

    let status: ActivityStatusEnum;

    if (isInProgress) {
      status = ActivityStatusEnum.IN_PROGRESS;
    } else if (isDone) {
      status = ActivityStatusEnum.DONE;
    } else if (isPending) {
      status = ActivityStatusEnum.PENDING;
    } else {
      status = ActivityStatusEnum.UNKOWN;
    }

    return {
      ...activity,
      status,
    };
  });

  peopleActivities.sort((a, b) =>
    moment(a.startTime).isAfter(moment(b.startTime)) ? 1 : -1
  );

  return peopleActivities;
};

const activities: Activity[] = [
  new Activity("Cooking", 5, 80),
  new Activity("Playing", 4, 100),
  new Activity("Exercising", 4, 90),
  new Activity("Take a shower", 1, 30),
];

const materials: Material[] = [
  new Material("Concrete", 1.74, 8),
  new Material("Brick", 0.67, 10),
];

const ambient: Ambient[] = [
  new Ambient("Summer", "8 * Math.sin((x / 4) - 1.6) + 23"),
];

const walls: Wall[] = [
  new Wall(materials[0], 0.3),
  new Wall(materials[1], 0.2),
];

const peopleActivities: PeopleActivity[] = getPeopleActivities([
  new PeopleActivity(
    activities[0],
    moment().add(60, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
  new PeopleActivity(
    activities[1],
    moment().add(50, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
  new PeopleActivity(
    activities[2],
    moment().add(1100, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
  new PeopleActivity(
    activities[3],
    moment().add(1200, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
  new PeopleActivity(
    activities[1],
    moment().add(1000, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
  new PeopleActivity(
    activities[3],
    moment().add(1060, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
  new PeopleActivity(
    activities[2],
    moment().add(900, "minute").toString(),
    ActivityStatusEnum.UNKOWN
  ),
]);

const wall = new Wall(materials[0], 30);
const sampleWall = new ApartmentWall([], wall, WallType.FLOOR_CEILING);

const people: People[] = [
  new People("John Doe", 30, [peopleActivities[0], peopleActivities[4]]),
  new People("Jane Doe", 25, [peopleActivities[1]]),
  new People("Jhonny Doe", 35, [peopleActivities[2], peopleActivities[5]]),
  new People("Janet Doe", 40, [peopleActivities[3], peopleActivities[6]]),
];

export const APP_DATA: StateInterface = {
  timer: {
    startTime: moment().add(12, 'hours').toString(),
    minutesPerSecond: 1,
    paused: false,
    time: 0,
  },
  messages: [],
  graph: {
    data: {},
    layout: {},
    temperature: 0,
  },
  activities,
  ambient,
  apartments: [
    [
      [
        new Apartment(1, 1, [people[0]], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
        new Apartment(2, 1, [people[1]], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
      ],
      [
        new Apartment(3, 1, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
        new Apartment(4, 1, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
      ],
    ],
    [
      [
        new Apartment(2, 2, [people[2]], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
        new Apartment(2, 2, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
      ],
      [
        new Apartment(3, 2, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
        new Apartment(4, 2, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
      ],
    ],

    [
      [
        new Apartment(1, 3, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
        new Apartment(2, 3, [people[3]], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
      ],
      [
        new Apartment(3, 3, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
        new Apartment(4, 3, [], ApartmentLivingStatus.HABITABLE, {
          back: sampleWall,
          right: sampleWall,
          floor: sampleWall,
          ceiling: sampleWall,
          front: sampleWall,
          left: sampleWall,
        }),
      ],
    ],
  ],
  build: new Building(3, 4, "sample 1", ambient[0] as Ambient),
  materials,
  people,
  peopleActivities,
  walls,
};
