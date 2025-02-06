import { Box } from "@mui/material";
import { FC } from "react";
import { PeopleActivityInterface } from "../../model/peopleActivity";
import { EventListComponent } from "./EventListComponent";

interface SolutionSideBarProps {
  currentEventList: Array<PeopleActivityInterface>;
  nextEventList: Array<PeopleActivityInterface>;
}

export const SolutionSideBar: FC<SolutionSideBarProps> = ({
  currentEventList,
  nextEventList,
}) => {
  return (
    <Box
      sx={{
        flexBasis: "30%",
        borderLeft: "0.5px solid rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 1,
        paddingY: 0,
        flexWrap: "nowrap",
      }}
    >
      <EventListComponent label="Current events" events={currentEventList} />
      <EventListComponent label="Next events" events={nextEventList} />
    </Box>
  );
};
