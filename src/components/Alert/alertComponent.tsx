import { Alert } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface AlertComponentProps {
  message: string;
}

export const AlertComponent: FC<AlertComponentProps> = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);

    }, 8000);
  }, []);

  return <>{show ? <Alert severity="warning">{message}</Alert> : null}</>;
};
