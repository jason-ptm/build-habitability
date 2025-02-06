import ThermostatIcon from "@mui/icons-material/Thermostat";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { FC } from "react";
import { TimerInterface } from "../../model/timer";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { PeopleActivityInterface } from "../../model/peopleActivity";
import { useAppContext } from "../../context/hooks";
import { getTimeAsDecimal } from "../../utils/temperature";

interface TimerProps {
  timer: TimerInterface;
  activity: PeopleActivityInterface;
  handleTrigger: (activity?: PeopleActivityInterface) => void;
}

export const Timer: FC<TimerProps> = ({ timer, activity, handleTrigger }) => {
  const { dispatch, ambient, graph } = useAppContext();
  const [relativeCurrentTime, setRelativeCurrentTime] = useState(
    timer.startTime
  );
  const [relativeTemperature, setRelativeTemperature] = useState(
    graph.temperature
  );

  useEffect(() => {
    const count = timer.minutesPerSecond / 10;
    const interval = setInterval(() => {
      setRelativeCurrentTime((prev) => {
        if (
          moment(activity?.startTime).isBetween(
            prev,
            moment(prev).add(timer.minutesPerSecond, "minute")
          )
        ) {
          handleTrigger(activity);
        }
        if (timer.paused) {
          clearInterval(interval);
        }

        // Obtén las horas y minutos
        const hours = moment(prev).hours();
        const minutes = moment(prev).minutes();

        setRelativeTemperature(
          Math.round(ambient[0].calculateTemperature(hours + minutes / 60))
        );
        return moment(prev).add(count, "minute").toString();
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timer, activity]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_TEMPERATURE",
      payload: relativeTemperature,
    });
    dispatch({
      type: "UPDATE_TIME",
      payload: getTimeAsDecimal(relativeCurrentTime),
    });
  }, [relativeTemperature]);

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "200x",
          padding: 1,
          borderRadius: 1,
          backgroundColor: "#f5f5f5dc",
        }}
      >
        <Typography variant="body1">
          {moment(relativeCurrentTime).format("LLL")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "8px",
          gap: 2,
        }}
      >
        <IconButton
          onClick={() =>
            dispatch({
              type: "TOOGLE_PAUSE_TIMER",
              payload: !timer.paused,
            })
          }
        >
          {!timer.paused ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Slider
          defaultValue={timer.minutesPerSecond}
          step={1}
          marks
          min={1}
          max={10}
          onChange={(_e, newValue) =>
            dispatch({
              type: "UPDATE_SECONDS_PER_MINUTE",
              payload: newValue as number | 0,
            })
          }
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <ThermostatIcon />
        <Typography variant="body1">{relativeTemperature} °C</Typography>
      </Box>
    </Box>
  );
};
