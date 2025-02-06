import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppContext } from "../../context/hooks";
import { FormPropsInterface } from "../../model/interface/Form";
import { PeopleInterface } from "../../model/people";

const initialState = {
  id: "",
  name: "",
  age: 0,
  activities: [],
};

export const PeopleForm: FC<FormPropsInterface<PeopleInterface>> = ({
  handlers,
  data,
}) => {
  const { ambient: ambients } = useAppContext();
  const [formData, setFormData] = useState<PeopleInterface>(
    data || initialState
  );
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    if (
      formData?.name === data?.name &&
      formData?.age === data.age &&
      formData?.activities === data.activities
    ) {
      setEnableSend(true);
    } else if (!!formData?.name && !!formData?.age && !!formData?.activities) {
      setEnableSend(false);
    } else {
      setEnableSend(true);
    }
  }, [formData]);

  const isEdit = !!data;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box>
      <h1>{`${isEdit ? "Edit" : "Add"} Wall Form`}</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={formData?.name}
          required
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          variant="outlined"
          onChange={handleChange}
          value={formData?.age}
          required
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <Button variant="contained" color="error" onClick={handlers?.onCancel}>
          Cancel
        </Button>
        <Button variant="contained" disabled={enableSend}>
          {isEdit ? "Update" : "Add"} Wall
        </Button>
      </Box>
    </Box>
  );
};
