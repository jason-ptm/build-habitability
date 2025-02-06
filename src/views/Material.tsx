import { MaterialForm } from "../components/MaterialForm";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { FormPropsInterface } from "../model/interface/Form";
import { MaterialInterface } from "../model/material";
import { ComponentView } from "../wrappers";

export const Material = () => {
  const { materials: mateirals } = useAppContext();

  const handleEdit = (data: MaterialInterface) => {
    console.log(data);
  };

  const handleDelete = (data: MaterialInterface) => {
    console.log(data);
  };

  const handleAdd = (data: MaterialInterface) => {
    console.log(data);
  };

  return (
    <ComponentView
      {...ViewConstants.MATERIAL}
      data={mateirals}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => (
        <MaterialForm {...(props as FormPropsInterface<MaterialInterface>)} />
      )}
    />
  );
};
