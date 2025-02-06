import { v4 as uuidv4 } from "uuid";
import { PeopleActivity, PeopleActivityInterface } from "./peopleActivity";

export class People {
  id: string;
  name: string;
  age: number;
  activities: PeopleActivity[];

  constructor(
    name: string,
    age: number,
    activities: PeopleActivityInterface[] = []
  ) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.activities = activities;
  }

  assignActivity(activity: PeopleActivity) {
    this.activities.push(activity);
  }
}

export interface PeopleInterface {
  id: string;
  name: string;
  age: number;
  activities: PeopleActivityInterface[];
}
