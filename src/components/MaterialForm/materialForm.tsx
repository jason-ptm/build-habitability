import { FC, useEffect, useState } from "react";
import { MaterialInterface } from "../../model/material";
import { Box, Button, TextField } from "@mui/material";
import { FormPropsInterface } from "../../model/interface/Form";

const initialState = {
  id: "",
  name: "",
  temperatureResistance: 0,
};

export const MaterialForm: FC<FormPropsInterface<MaterialInterface>> = ({
  handlers,
  data,
}) => {
  const [formData, setFormData] = useState<MaterialInterface>(
    data || initialState
  );
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    if (
      formData?.name === data?.name &&
      formData?.temperatureResistance === data.temperatureResistance
    ) {
      setEnableSend(true);
    } else if (!!formData?.name && !!formData?.temperatureResistance) {
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
          label="Thermal conductivity"
          name="temperatureResistance"
          variant="outlined"
          onChange={handleChange}
          error={formData?.temperatureResistance < 0}
          value={formData?.temperatureResistance}
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
