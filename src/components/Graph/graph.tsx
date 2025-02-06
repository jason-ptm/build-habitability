import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import Plot from "react-plotly.js";
import { useAppContext } from "../../context/hooks";
import { getNodesAndLinks } from "../../utils/graph";

export const Graph: FC = () => {
  const { dispatch, graph, build, apartments, timer, peopleActivities } =
    useAppContext();

  useEffect(() => {
    const { nodes, links } = getNodesAndLinks(
      build.poblateBuilding(apartments, peopleActivities)
    );
    dispatch({
      type: "FETCH_GRAPH_DATA",
      payload: {
        nodes,
        links,
        dispatch,
      },
    });
  }, []);

  useEffect(() => {
    const calculatedApartments = build.calculateTemperaturesForTime(
      timer.time,
      graph.temperature,
      build.poblateBuilding(apartments, peopleActivities)
    );
    const { nodes, links } = getNodesAndLinks(calculatedApartments);
    dispatch({
      type: "FETCH_GRAPH_DATA",
      payload: {
        nodes,
        links,
        dispatch,
      },
    });
  }, [peopleActivities, graph.temperature]);

  return (
    <Box sx={{ flexBasis: "100%", height: "100%", overflow: "auto" }}>
      <Plot data={graph.data} layout={graph.layout}></Plot>
    </Box>
  );
};
