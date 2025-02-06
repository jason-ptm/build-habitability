import { ActionType, StateInterface } from ".";
import { ActivityStatusEnum } from "../constants/constants";
import { getGraphData, triggerActionStart } from "./actions";

export const reducer = (state: StateInterface, action: ActionType) => {
  switch (action.type) {
    case "TRIGGER_ACTION_START":
      return triggerActionStart(
        state,
        action.payload,
        ActivityStatusEnum.IN_PROGRESS
      );
    case "TRIGGER_ACTION_END":
      return triggerActionStart(state, action.payload, ActivityStatusEnum.DONE);

    case "TOOGLE_PAUSE_TIMER": {
      return {
        ...state,
        timer: {
          ...state.timer,
          paused: action.payload,
        },
      };
    }
    case "UPDATE_SECONDS_PER_MINUTE": {
      return {
        ...state,
        timer: {
          ...state.timer,
          minutesPerSecond: action.payload,
        },
      };
    }
    case "FETCH_GRAPH_DATA": {
      const { nodes, links, dispatch } = action.payload;
      getGraphData(nodes, links, dispatch);
      return {
        ...state,
      };
    }
    case "ADD_GRAPH_DATA": {
      return {
        ...state,
        graph: {
          ...state.graph,
          data: action.payload.data,
          layout: action.payload.layout,
        },
      };
    }
    case "UPDATE_TEMPERATURE": {
      return {
        ...state,
        graph: {
          ...state.graph,
          temperature: action.payload,
        },
      };
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        timer: {
          ...state.timer,
          time: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
