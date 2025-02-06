import { FC, useEffect, useState } from "react";
import { WallInterface } from "../../model/wall";
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
import { useAppContext } from "../../context/hooks";
import { FormPropsInterface } from "../../model/interface/Form";

const initialState = {
  id: "",
  material: {
    id: "0",
    name: "--CHOOSE MATERIAL--",
    temperatureResistance: 0,
  },
  thickness: 0,
};

export const WallForm: FC<FormPropsInterface<WallInterface>> = ({
  handlers,
  data,
}) => {
  const { materials } = useAppContext();
  const [formData, setFormData] = useState<WallInterface>(data || initialState);
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    if (
      formData?.material.id === data?.material.id &&
      formData?.thickness === data.thickness
    ) {
      setEnableSend(true);
    } else if (formData?.material.id !== "0" && !!formData?.thickness) {
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
    const material = materials.find(
      (material) => material.id === e.target.value
    );
    setFormData({ ...formData, material: material || initialState.material });
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
          label="Thickness"
          name="thickness"
          variant="outlined"
          onChange={handleChange}
          value={formData?.thickness}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Material</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData?.material.id}
            label="Material"
            onChange={handleSelectChange}
          >
            <MenuItem value={initialState.material.id}>
              {initialState.material.name}
            </MenuItem>
            {materials.map((material, index) => (
              <MenuItem key={index} value={material.id}>
                {material.name}
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
