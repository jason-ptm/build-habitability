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
import { BuildInterface } from "../../model/build";
import { FormPropsInterface } from "../../model/interface/Form";
import { useAppContext } from "../../context/hooks";

const initialState = {
  id: "",
  name: "",
  ambient: {
    id: "0",
    name: "--CHOOSE AMBIENT--",
    formule: "",
  },
};

export const BuildForm: FC<FormPropsInterface<BuildInterface>> = ({
  handlers,
  data,
}) => {
  const { ambient: ambients } = useAppContext();
  const [formData, setFormData] = useState<BuildInterface>(
    data || initialState
  );
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    if (
      formData?.name === data?.name &&
      formData?.ambient.id === data.ambient.id
    ) {
      setEnableSend(true);
    } else if (!!formData?.name && !!formData?.ambient.id) {
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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const ambient = ambients.find((ambient) => ambient.id === e.target.value);
    setFormData({ ...formData, ambient: ambient || initialState.ambient });
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Material</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData?.ambient.id}
            label="ambient"
            onChange={handleSelectChange}
          >
            <MenuItem value={initialState.ambient.id}>
              {initialState.ambient.name}
            </MenuItem>
            {ambients.map((ambient, index) => (
              <MenuItem key={index} value={ambient.id}>
                {ambient.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
