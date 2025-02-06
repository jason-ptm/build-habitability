import { Box, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ActivityInterface } from "../../model/activity";
import { FormPropsInterface } from "../../model/interface/Form";

const initialState = {
  id: "",
  name: "",
  temperature: 0,
  durability: 0,
};

export const ActivityForm: FC<FormPropsInterface<ActivityInterface>> = ({
  handlers,
  data,
}) => {
  const [formData, setFormData] = useState<ActivityInterface>(
    data || initialState
  );
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    if (
      formData?.name === data?.name &&
      formData?.temperature === data.temperature &&
      formData?.durability === data.durability
    ) {
      setEnableSend(true);
    } else if (
      !!formData?.name &&
      !!formData?.temperature &&
      !!formData?.durability
    ) {
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
          type="number"
          fullWidth
          label="Aditional temperature"
          name="temperature"
          variant="outlined"
          onChange={handleChange}
          error={formData?.temperature < 0}
          value={formData?.temperature}
          required
        />
        <TextField
          type="number"
          fullWidth
          label="Activity duration"
          name="durability"
          variant="outlined"
          onChange={handleChange}
          error={formData?.durability < 0}
          value={formData?.durability}
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
