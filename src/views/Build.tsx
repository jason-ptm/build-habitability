import { BuildForm } from "../components/BuildForm";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { BuildInterface } from "../model/build";
import { ComponentView } from "../wrappers";

export const Build = () => {
  const { build } = useAppContext();

  const handleEdit = (data: BuildInterface) => {
    console.log(data);
  };

  const handleDelete = (data: BuildInterface) => {
    console.log(data);
  };

  const handleAdd = (data: BuildInterface) => {
    console.log(data);
  };

  return (
    <ComponentView
      {...ViewConstants.BUILDING}
      data={[build]}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => <BuildForm {...props} />}
    ></ComponentView>
  );
};
