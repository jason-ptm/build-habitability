export interface EntityAttribute {
  key?: string;
  label: string;
  dataType?: "string" | "number" | "date" | "boolean" | "currency";
  accessorFn?: (row: any) => void;
  showInTable: boolean;
  filter?: boolean;
  sort?: boolean;
  // order: number
}

export interface EntityName {
  singular: string;
  plural: string;
}

export interface UiEntity {
  name: EntityName;
  slug: string;
  primaryKeyAttribute: string;
  linkedToViewAttribute: string;
  attributes: EntityAttribute[];
}
