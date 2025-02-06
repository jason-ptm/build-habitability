import { Dispatch } from "react";
import { ActionType, StateInterface } from ".";
import { ActivityStatusEnum } from "../constants/constants";
import { PeopleActivityInterface } from "../model/peopleActivity";
import { LinkInterface, NodeInterface } from "../model/graph";

export const triggerActionStart = (
  state: StateInterface,
  activity: PeopleActivityInterface,
  status: ActivityStatusEnum
): StateInterface => {
  const peopleActivities = state.peopleActivities.map((item) => {
    if (item.id === activity.id) {
      return {
        ...item,
        status,
      };
    }
    return item;
  });

  return {
    ...state,
    peopleActivities,
  };
};

export const getGraphData = (
  nodes: NodeInterface[],
  links: LinkInterface[],
  dispatch: Dispatch<ActionType>
) => {
  fetch("http://127.0.0.1:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nodes, links }),
  }).then(async (response) => {
    const data = await response.json();

    dispatch({ type: "ADD_GRAPH_DATA", payload: data });
  });
};
