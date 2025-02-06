import { FC, useEffect, useState } from "react";
import { AmbientInterface } from "../../model/ambient";
import { FormPropsInterface } from "../../model/interface/Form";
import { Box, Button, TextField } from "@mui/material";

const initialState = {
  id: "",
  name: "",
  formule: "",
};

export const AmbientForm: FC<FormPropsInterface<AmbientInterface>> = ({
  handlers,
  data,
}) => {
  const [formData, setFormData] = useState<AmbientInterface>(
    data || initialState
  );
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    if (formData?.name === data?.name && formData?.formule === data.formule) {
      setEnableSend(true);
    } else if (!!formData?.name && !!formData?.formule) {
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
          label="Formule"
          name="formule"
          variant="outlined"
          onChange={handleChange}
          value={formData?.formule}
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
