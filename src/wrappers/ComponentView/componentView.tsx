import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import { FC, useState, ReactNode, useCallback } from "react";
import DataTable from "../../components/DataTable/dataTable";
import { UiEntity } from "../../model/interface/Entity";
import { FormPropsInterface } from "../../model/interface/Form";

export interface ComponentViewProps {
  data: Array<object>;
  title: string;
  entity: UiEntity;
  handlers: {
    onEdit: (data: any) => void;
    onDelete: (data: any) => void;
    onAdd: (data: any) => void;
  };
  getForm: (props: FormPropsInterface<any>) => ReactNode;
}

export const ComponentView: FC<ComponentViewProps> = ({
  data,
  title,
  entity,
  handlers,
  getForm,
}) => {
  const [rowSelected, setRowSelected] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const component = useCallback(
    () =>
      getForm({
        data: rowSelected,
        handlers: { ...handlers, onCancel: handleCancel },
      }),
    [rowSelected, handlers, getForm]
  );

  const dataTable = {
    meta: {
      page: 1,
      perPage: 10,
      itemCount: data?.length,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
    data,
  };

  const onRowSelectedChange = (row: any) => {
    setRowSelected(row);
  };

  const handleEdit = () => {
    if (!!rowSelected) {
      setIsFormVisible(true);
    }
  };

  const handleAdd = () => {
    setIsFormVisible(true);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setRowSelected(null);
  };

  return (
    <div>
      {!isFormVisible ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{title}</h1>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
              }}
            >
              <Button
                disabled={!!rowSelected}
                variant="contained"
                color="success"
                onClick={handleAdd}
                sx={{
                  width: "36px",
                  minWidth: "36px",
                  padding: "0",
                  height: "36px",
                  borderRadius: "100%",
                }}
              >
                <AddIcon />
              </Button>
              <Button
                disabled={!rowSelected}
                variant="contained"
                onClick={handleEdit}
                sx={{
                  width: "36px",
                  minWidth: "36px",
                  padding: "0",
                  height: "36px",
                  borderRadius: "100%",
                }}
              >
                <EditIcon />
              </Button>
              <Button
                disabled={!rowSelected}
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{
                  width: "36px",
                  minWidth: "36px",
                  padding: "0",
                  height: "36px",
                  borderRadius: "100%",
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          </Box>
          <DataTable
            dataTable={dataTable}
            entity={entity}
            onRowSelected={onRowSelectedChange}
          />
        </>
      ) : (
        component()
      )}
    </div>
  );
};
