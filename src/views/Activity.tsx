import { ActivityForm } from "../components/ActivityForm";
import { WallType } from "../constants/constants";
import { ViewConstants } from "../constants/views";
import { useAppContext } from "../context/hooks";
import { buildApartmentsWalls } from "../helpers/builder.helper";
import { ActivityInterface } from "../model/activity";
import { FormPropsInterface } from "../model/interface/Form";
import { Wall } from "../model/wall";
import { ComponentView } from "../wrappers";

export const Activity = () => {
  const { activities: activity, apartments, walls } = useAppContext();
  const handleEdit = (data: ActivityInterface) => {
    console.log(data);
  };

  const handleDelete = (data: ActivityInterface) => {
    console.log(data);
  };

  const handleAdd = (data: ActivityInterface) => {
    console.log(data);
  };

  console.log(
    buildApartmentsWalls(
      apartments,
      new Wall(walls[0].material, walls[0].thickness),
      WallType.WALL
    )
  );

  return (
    <ComponentView
      {...ViewConstants.ACTIVITY}
      data={activity}
      handlers={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onAdd: handleAdd,
      }}
      getForm={(props) => (
        <ActivityForm {...(props as FormPropsInterface<ActivityInterface>)} />
      )}
    />
  );
};
