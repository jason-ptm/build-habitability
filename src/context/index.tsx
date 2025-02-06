import React, { Dispatch, FC, createContext, useMemo, useReducer } from "react";

import { Activity } from "../model/activity";
import { Ambient } from "../model/ambient";
import { Apartment } from "../model/apartment";
import { Building } from "../model/build";
import { GraphInterface, LinkInterface, NodeInterface } from "../model/graph";
import { Material } from "../model/material";
import { People } from "../model/people";
import {
  PeopleActivity,
  PeopleActivityInterface,
} from "../model/peopleActivity";
import { TimerInterface } from "../model/timer";
import { Wall } from "../model/wall";
import { reducer } from "./reducer";

export interface StateInterface {
  ambient: Ambient[];
  activities: Activity[];
  apartments: Apartment[][][];
  walls: Wall[];
  people: People[];
  build: Building;
  materials: Material[];
  peopleActivities: PeopleActivity[];
  timer: TimerInterface;
  graph: GraphInterface;
}

interface ProviderProps {
  children: React.ReactNode;
  config: StateInterface;
}

export type ActionType =
  | {
      type: "TRIGGER_ACTION_START";
      payload: PeopleActivityInterface;
    }
  | {
      type: "TRIGGER_ACTION_END";
      payload: PeopleActivityInterface;
    }
  | {
      type: "TOOGLE_PAUSE_TIMER";
      payload: boolean;
    }
  | {
      type: "UPDATE_SECONDS_PER_MINUTE";
      payload: number;
    }
  | {
      type: "FETCH_GRAPH_DATA";
      payload: {
        nodes: NodeInterface[];
        links: LinkInterface[];
        dispatch: Dispatch<ActionType>;
      };
    }
  | {
      type: "ADD_GRAPH_DATA";
      payload: any;
    }
  | {
      type: "UPDATE_TEMPERATURE";
      payload: number;
    }
  | {
      type: "UPDATE_TIME";
      payload: number;
    };

export type DispatchType = {
  type: "";
  payload: any;
};

type Reducer<S, A> = (prevState: S, action: A) => S;

export const AppContext = createContext<{
  state: StateInterface;
  dispatch: Dispatch<ActionType>;
}>({} as { state: StateInterface; dispatch: Dispatch<ActionType> });

const Provider: FC<ProviderProps> = ({ children, config }) => {
  const [state, dispatch] = useReducer<Reducer<StateInterface, ActionType>>(
    reducer,
    config
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext as Context, Provider };
