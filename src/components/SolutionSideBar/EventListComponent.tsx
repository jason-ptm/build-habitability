import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { PeopleActivityInterface } from "../../model/peopleActivity";
import { EventItemComponent } from "./EventItemComponent";
import { ActivityStatusEnum } from "../../constants/constants";

interface EventListComponentProps {
  label: string;
  events: Array<PeopleActivityInterface>;
}

export const EventListComponent: FC<EventListComponentProps> = ({
  label,
  events,
}) => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <Box
      sx={{
        height: "auto",
        borderTop:
          label === "Current events" ? "" : "0.5px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <List
        sx={{
          height: "100%",
          width: "100%",
        }}
        subheader={
          <ListSubheader component="div">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingY: 2,
              }}
            >
              <Typography sx={{ flexGrow: 1 }} align="center" variant="body1">
                {label}
              </Typography>
              <IconButton
                sx={{ position: "absolute", right: 0 }}
                onClick={() => setShowEvents(!showEvents)}
              >
                {showEvents ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
          </ListSubheader>
        }
      >
        <Collapse in={!showEvents} timeout="auto" sx={{ height: "100%" }}>
          <List component="div">
            {events.map((event) => (
              <EventItemComponent
                key={event.id}
                current={event.status === ActivityStatusEnum.IN_PROGRESS}
                event={event}
              />
            ))}
            {events.length === 0 && (
              <Typography variant="body1" color="textDisabled" align="center">
                No events
              </Typography>
            )}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};
