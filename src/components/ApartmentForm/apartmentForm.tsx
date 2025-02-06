import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ApartmentInterface } from "../../model/apartment";
import { FormPropsInterface } from "../../model/interface/Form";
import { ApartmentLivingStatus } from "../../constants/constants";
import { useAppContext } from "../../context/hooks";
import { PeopleInterface } from "../../model/people";

const initialState = {
  id: "",
  number: 0,
  floor: 0,
  resident: [],
  code: "",
  livingStatus: ApartmentLivingStatus.HABITABLE,
  walls: [],
  temperature: 0,
};

interface PeopleListInterface {
  person: PeopleInterface;
  selected: boolean;
}

export const ApartmentForm: FC<FormPropsInterface<ApartmentInterface>> = ({
  handlers,
  data,
}) => {
  const { people } = useAppContext();
  const [peopleList, setPeopleList] = useState<Array<PeopleListInterface>>([]);
  const [formData, setFormData] = useState<ApartmentInterface>(
    data || initialState
  );
  const [enableSend, setEnableSend] = useState<boolean>(false);

  useEffect(() => {
    const list = people.map((person) => {
      return {
        person,
        selected: !!data?.resident?.some(
          (resident) => resident.id === person.id
        ),
      };
    });
    setPeopleList(list);
  }, [data]);

  useEffect(() => {
    if (
      formData?.number === data?.number &&
      formData?.floor === data.floor &&
      formData?.resident === data.resident &&
      formData?.livingStatus === data.livingStatus
    ) {
      setEnableSend(true);
    } else if (
      !!formData?.number &&
      !!formData?.floor &&
      !!formData?.resident &&
      !!formData?.livingStatus
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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      livingStatus: e.target.value as ApartmentLivingStatus,
    });
  };

  const handlePersonListChange = (e: SelectChangeEvent<string>) => {
    const { value: id } = e.target;

    const list = peopleList.map((person) => {
      if (person.person.id === id) {
        person.selected = true;
      }
      return person;
    });

    setPeopleList(list);
  };

  const handleDeletePerson = (id: string) => {
    const list = peopleList.map((person) => {
      if (person.person.id === id) {
        person.selected = false;
      }
      return person;
    });

    setPeopleList(list);
  };

  return (
    <Box>
      <h1>{`${isEdit ? "Edit" : "Add"} apartment Form`}</h1>
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
          type="number"
          label="Apartment number"
          name="number"
          variant="outlined"
          error={formData?.number < 0}
          onChange={handleChange}
          value={formData?.number}
          required
        />
        <TextField
          type="number"
          fullWidth
          label="Apartment floor"
          name="floor"
          variant="outlined"
          onChange={handleChange}
          error={formData?.floor < 0}
          value={formData?.floor}
          required
        />
        <TextField
          type="number"
          fullWidth
          label="Residents"
          name="floor"
          variant="outlined"
          onChange={handleChange}
          error={formData?.floor < 0}
          value={formData?.floor}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Living statuss</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData?.livingStatus}
            label="Estado de vivienda"
            onChange={handleSelectChange}
          >
            {Object.values(ApartmentLivingStatus).map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Residents</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Estado de vivienda"
              onChange={handlePersonListChange}
            >
              {peopleList
                .filter((person) => !person.selected)
                .map((person, index) => (
                  <MenuItem key={index} value={person.person.id}>
                    {person.person.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {peopleList
              .filter((person) => person.selected)
              .map((person, index) => (
                <Chip
                  key={index}
                  label={person.person.name}
                  onDelete={() => handleDeletePerson(person.person.id)}
                />
              ))}
          </Box>
        </Box>
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
