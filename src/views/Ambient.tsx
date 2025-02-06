import { AmbientForm } from "../components/AmbientForm";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { AmbientInterface } from "../model/ambient";
import { ComponentView } from "../wrappers";

export const Ambient = () => {
  const { ambient } = useAppContext();

  const handleEdit = (data: AmbientInterface) => {
    console.log(data);
  };

  const handleDelete = (data: AmbientInterface) => {
    console.log(data);
  };

  const handleAdd = (data: AmbientInterface) => {
    console.log(data);
  };

  return (
    <ComponentView
      {...ViewConstants.AMBIENT}
      data={ambient}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => <AmbientForm {...props} />}
    ></ComponentView>
  );
};
