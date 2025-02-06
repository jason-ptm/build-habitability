import { WallForm } from "../components/WallForm";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { FormPropsInterface } from "../model/interface/Form";
import { WallInterface } from "../model/wall";
import { ComponentView } from "../wrappers";

export const Wall = () => {
  const { walls: wall } = useAppContext();

  const handleEdit = (data: WallInterface) => {
    console.log(data);
  };

  const handleDelete = (data: WallInterface) => {
    console.log(data);
  };

  const handleAdd = (data: WallInterface) => {
    console.log(data);
  };

  return (
    <ComponentView
      {...ViewConstants.WALL}
      data={wall}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => (
        <WallForm {...(props as FormPropsInterface<WallInterface>)} />
      )}
    />
  );
};
