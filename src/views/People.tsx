import { PeopleForm } from "../components/PeopleForm";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { FormPropsInterface } from "../model/interface/Form";
import { PeopleInterface } from "../model/people";
import { ComponentView } from "../wrappers";

export const People = () => {
  const { people } = useAppContext();

  const handleEdit = (data: PeopleInterface) => {
    console.log(data);
  };

  const handleDelete = (data: PeopleInterface) => {
    console.log(data);
  };

  const handleAdd = (data: PeopleInterface) => {
    console.log(data);
  };

  return (
    <ComponentView
      {...ViewConstants.PEOPLE}
      data={people}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => (
        <PeopleForm {...(props as FormPropsInterface<PeopleInterface>)} />
      )}
    />
  );
};
