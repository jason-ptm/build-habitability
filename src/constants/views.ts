import { ComponentViewProps } from "../wrappers";

type ConstantsType = Pick<ComponentViewProps, "entity" | "title">;

export const ViewConstants: Record<string, ConstantsType> = {
  ACTIVITY: {
    title: "Activity",
    entity: {
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "name",
          label: "Name",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "temperature",
          label: "Temperature",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "durability",
          label: "Duration",
          showInTable: true,
          sort: true,
          filter: false,
        },
      ],
      slug: "activity",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "id",
      name: {
        singular: "activity",
        plural: "activities",
      },
    },
  },
  AMBIENT: {
    title: "Ambient",
    entity: {
      slug: "ambient",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "id",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "name",
          label: "Name",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "formule",
          label: "Formule",
          showInTable: true,
          sort: false,
          filter: false,
        },
      ],
      name: {
        singular: "ambient",
        plural: "ambients",
      },
    },
  },
  APARTMENT: {
    title: "Apartment",
    entity: {
      slug: "apartment",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "id",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "code",
          label: "Code",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "livingStatus",
          label: "Living Status",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "temperature",
          label: "Temperature",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "resident",
          label: "Residents number",
          showInTable: true,
          sort: true,
          filter: false,
          accessorFn: (value) => value.resident.length,
        },
      ],
      name: {
        singular: "apartment",
        plural: "apartments",
      },
    },
  },
  BUILDING: {
    title: "Building",
    entity: {
      slug: "building",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "name",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "ambient",
          label: "Ambient",
          showInTable: false,
          sort: true,
          filter: false,
        },
        {
          key: "name",
          label: "Name",
          showInTable: true,
          sort: false,
          filter: false,
        },
      ],
      name: {
        singular: "building",
        plural: "buildings",
      },
    },
  },
  MATERIAL: {
    title: "Material",
    entity: {
      slug: "material",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "if",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "name",
          label: "Name",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "temperatureResistance",
          label: "Resistance coefficient",
          showInTable: true,
          sort: false,
          filter: false,
        },
      ],
      name: {
        singular: "material",
        plural: "materials",
      },
    },
  },
  PEOPLE: {
    title: "People",
    entity: {
      slug: "people",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "id",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "name",
          label: "Name",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "age",
          label: "Age",
          showInTable: true,
          sort: false,
          filter: false,
        },
      ],
      name: {
        singular: "people",
        plural: "people",
      },
    },
  },
  PEOPLE_ACTIVITIES: {
    title: "People activities",
    entity: {
      slug: "peopleActivities",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "id",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "startTime",
          label: "Start Time",
          showInTable: true,
          sort: false,
          filter: false,
        },
        {
          key: "status",
          label: "Status",
          showInTable: true,
          sort: true,
          filter: false,
        },
      ],
      name: {
        singular: "wall",
        plural: "walls",
      },
    },
  },
  WALL: {
    title: "Wall",
    entity: {
      slug: "wall",
      primaryKeyAttribute: "id",
      linkedToViewAttribute: "id",
      attributes: [
        {
          key: "id",
          label: "ID",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "material.name",
          label: "Material",
          showInTable: true,
          sort: true,
          filter: false,
        },
        {
          key: "thickness",
          label: "Thickness",
          showInTable: true,
          sort: true,
          filter: false,
        },
      ],
      name: {
        singular: "wall",
        plural: "walls",
      },
    },
  },
};
