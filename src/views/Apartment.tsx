import { ApartmentForm } from "../components/ApartmentForm";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { ApartmentInterface } from "../model/apartment";
import { ComponentView } from "../wrappers";

export const Apartment = () => {
  const { apartments: apartment } = useAppContext();

  const handleEdit = (data: ApartmentInterface) => {
    console.log(data);
  };

  const handleDelete = (data: ApartmentInterface) => {
    console.log(data);
  };

  const handleAdd = (data: ApartmentInterface) => {
    console.log(data);
  };

  return (
    <ComponentView
      {...ViewConstants.APARTMENT}
      data={apartment}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => <ApartmentForm {...props} />}
    />
  );
};
