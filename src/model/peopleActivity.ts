import { v4 as uuidv4 } from "uuid";
import { Activity } from "./activity";
import { ActivityStatusEnum } from "../constants/constants";

export class PeopleActivity {
  id: string;
  startTime: string;
  endTime: string;
  status: ActivityStatusEnum;
  activity: Activity;

  constructor(
    activity: Activity,
    startTime: string,
    status: ActivityStatusEnum
  ) {
    this.activity = activity;
    this.id = uuidv4();
    this.startTime = startTime;
    this.endTime = startTime + activity.durability; // CHANGE
    this.status = status;
  }
}

export interface PeopleActivityInterface {
  id: string;
  startTime: string;
  endTime: string;
  status: ActivityStatusEnum;
  activity: Activity;
}
