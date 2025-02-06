import SmartToyIcon from "@mui/icons-material/SmartToy";
import BathtubIcon from "@mui/icons-material/Bathtub";
import CookieIcon from "@mui/icons-material/Cookie";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { FC, useEffect, useState } from "react";
import { PeopleActivityInterface } from "../../model/peopleActivity";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import moment from "moment";
import { useAppContext } from "../../context/hooks";
import { findApartmentByActivityId } from "../../utils/apartment";

interface EventItemComponentProps {
  event: PeopleActivityInterface;
  current: boolean;
}

export const EventItemComponent: FC<EventItemComponentProps> = ({
  event,
  current,
}) => {
  const { timer, dispatch, apartments } = useAppContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (current) {
      const totalTime = event.activity.durability / timer.minutesPerSecond;
      const step = 1000 / (totalTime * 100);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + step >= 100) {
            dispatch({ type: "TRIGGER_ACTION_END", payload: event });
            clearInterval(interval);
            return 100;
          }
          if (timer.paused) {
            clearInterval(interval);
            return prev;
          }
          return prev + step;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [current, timer]);

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case "Cooking":
        return <CookieIcon />;
      case "Playing":
        return <SmartToyIcon />;
      case "Excersicing":
        return <DirectionsBikeIcon />;
      case "Take a shower":
        return <BathtubIcon />;
      default:
        return <DirectionsRunIcon />;
    }
  };

  const getTime = () => {
    if (current) {
      return `Ends at ${moment(event.endTime).format("LT")}`;
    } else {
      return `${moment(event.startTime).format("LT")} - ${moment(event.endTime).format("LT")}`;
    }
  };

  return (
    <ListItemButton key={event.id} sx={{ pl: 4 }}>
      <ListItemIcon>{getActivityIcon(event.activity.name)}</ListItemIcon>
      <ListItemText>
        <Box>
          <Typography variant="body1">{event.activity.name}</Typography>
          <Typography variant="body2" color="#676767">
            {getTime()}
          </Typography>
          <Typography variant="body2" color="#676767">
            {findApartmentByActivityId(apartments, event.id)?.code}
          </Typography>
          <Typography variant="body2" color="#676767">
            Temperature: +{event.activity.temperature}°C
          </Typography>
          <Typography variant="body2" color="#676767">
            Duration: {event.activity.durability} min
          </Typography>
        </Box>
      </ListItemText>
      {current && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            mt: 2,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
      )}
    </ListItemButton>
  );
};
