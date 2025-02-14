import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/hooks";
import { AlertComponent } from "./alertComponent";

export const AlertList = () => {
  const { messages } = useAppContext();

  const [messagesList, setMessagesList] = useState<Array<string>>([]);

  useEffect(() => {
    setMessagesList([...messagesList, ...messages]);
  }, [messages]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 1000,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {messagesList.map((message) => (
        <React.Fragment key={message}>
          <AlertComponent message={message} />
        </React.Fragment>
      ))}
    </Box>
  );
};
