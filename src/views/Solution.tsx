import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SolutionSideBar } from "../components/SolutionSideBar";
import { Timer } from "../components/Timer";
import { ActivityStatusEnum } from "../constants/constants";
import { useAppContext } from "../context/hooks";
import { PeopleActivityInterface } from "../model/peopleActivity";
import { Graph } from "../components/Graph";

export const Solution = () => {
  const { peopleActivities, timer, dispatch } = useAppContext();
  const [currentEventsList, setCurrentEventsList] = useState<
    Array<PeopleActivityInterface>
  >([]);
  const [nextEventsList, setNextEventsList] = useState<
    Array<PeopleActivityInterface>
  >([]);

  useEffect(() => {
    if (peopleActivities.length > 0) {
      const newCurrentEventsList: Array<PeopleActivityInterface> = [];
      const newNextEventsList: Array<PeopleActivityInterface> = [];
      peopleActivities.map((event) => {
        if (event.status === ActivityStatusEnum.IN_PROGRESS) {
          newCurrentEventsList.push(event);
        } else if (event.status === ActivityStatusEnum.PENDING) {
          newNextEventsList.push(event);
        }
      });
      setCurrentEventsList(newCurrentEventsList);
      setNextEventsList(newNextEventsList);
    }
  }, [peopleActivities]);

  const triggerAction = (activity?: PeopleActivityInterface) => {
    if (activity) {
      dispatch({ type: "TRIGGER_ACTION_START", payload: activity });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <script src="https://cdn.plot.ly/plotly-3.0.0.min.js"></script>

      <Timer
        timer={timer}
        activity={nextEventsList[0]}
        handleTrigger={triggerAction}
      />
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Graph />
      </Box>
      <SolutionSideBar
        currentEventList={currentEventsList}
        nextEventList={nextEventsList}
      />
    </Box>
  );
};
