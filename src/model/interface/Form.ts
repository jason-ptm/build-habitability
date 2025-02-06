export interface FormPropsInterface<T> {
  data: T | null;
  handlers?: {
    onEdit: (data: T) => void;
    onDelete: (data: T) => void;
    onAdd: (data: T) => void;
    onCancel: () => void;
  };
}
