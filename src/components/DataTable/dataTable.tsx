import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MRT_TableInstance,
  MRT_TableState,
  MRT_Updater,
  MRT_SortingState,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_Row,
} from "material-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";

import { MRT_Localization_ES } from "material-react-table/locales/es";
import { UiEntity } from "../../model/interface/Entity";
import { PaginatedResultInterface } from "../../model/interface/PaginatedResults";
import { stringToDate } from "../../helpers/date.helper";

type Props<T> = {
  entity: UiEntity;
  dataTable: PaginatedResultInterface<T>;
  sorting?: MRT_SortingState;
  filter?: MRT_ColumnFiltersState;

  onRowSelected?: (row: T | null) => void;
  onSortingChange?: (attributes: MRT_SortingState, query?: string) => void;
  onFilterChange?: (attributes: MRT_ColumnFiltersState, query?: string) => void;
  onPageChange?: (attributes: MRT_PaginationState) => void;
};

export default function DataTable<T extends Record<string, any>>(
  props: Props<T>
) {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  useEffect(() => {
    const [selectedRowEntry] = Object.entries(rowSelection);

    if (!!selectedRowEntry) {
      const [rowId] = selectedRowEntry;
      const selectedRowModelOriginal = props.dataTable.data.find(
        (row) => row.id === rowId
      );

      setSelectedRow(selectedRowModelOriginal as T);
    } else {
      setSelectedRow(null);
    }
  }, [rowSelection]);

  useEffect(() => {
    if (props.onRowSelected) {
      props.onRowSelected(selectedRow);
    }
  }, [selectedRow]);

  const columns = useMemo<MRT_ColumnDef<T>[]>(
    () =>
      props.entity.attributes
        .filter((attribute) => attribute.showInTable)
        .map((attribute) => {
          return {
            header: attribute.label,
            accessorKey: attribute.key,
            enableColumnFilter: attribute.filter,
            enableSorting: attribute.sort,
            enableColumnActions: attribute.filter || attribute.sort,
            accessorFn: (row: T) => {
              if (attribute.accessorFn) {
                return attribute.accessorFn(row);
              }

              if (attribute.dataType) {
                switch (attribute.dataType) {
                  case "boolean":
                    return _.get(row, attribute.key!, false) ? "Si" : "No";
                  case "date":
                    const date = _.get(row, attribute.key!);
                    if (!date) return "";
                    return stringToDate(date);
                  case "currency":
                    const COPCurrency = new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    });
                    const value = _.get(row, attribute.key!, "");

                    return COPCurrency.format(+value);
                  default:
                    return _.get(row, attribute.key!, "");
                }
              }

              return _.get(row, attribute.key!, "");
            },
          } as MRT_ColumnDef<T>;
        }),
    []
  );

  const tableState: Partial<MRT_TableState<T>> = {
    pagination: {
      pageIndex: props.dataTable.meta.page - 1,
      pageSize: props.dataTable.meta.perPage,
    },
    rowSelection,
    sorting: props.sorting || [],
  };

  const muiTableBodyRowProps = ({ row }: { row: MRT_Row<T> }) => ({
    onClick: row.getToggleSelectedHandler(),
    sx: {
      cursor: "pointer",
    },
  });

  const onSortingChangeHandle = (
    updaterOrValue: MRT_Updater<MRT_SortingState>
  ) => {
    const sortingState = props.sorting || [];

    if (typeof updaterOrValue !== "function") return;

    const requestedSorting = updaterOrValue(sortingState);

    if (!props.onSortingChange) return;

    const query = requestedSorting.length
      ? requestedSorting
          .map((sort) => `${sort.id}:${sort.desc ? "DESC" : "ASC"}`)
          .join(",")
      : undefined;

    props.onSortingChange(requestedSorting, query);
  };

  const onColumnFiltersChangeHandle = (
    updaterOrValue: MRT_Updater<MRT_ColumnFiltersState>
  ) => {
    const filterState = props.filter || [];

    if (typeof updaterOrValue !== "function") return;

    const requestedFilter = updaterOrValue(filterState);

    if (!props.onFilterChange) return;

    const query = requestedFilter.length
      ? requestedFilter
          .map((filter) => `${filter.id}:${filter.value}`)
          .join(",")
      : undefined;

    props.onFilterChange(requestedFilter, query);
  };

  const onPaginationChange = (
    updaterOrValue: MRT_Updater<MRT_PaginationState>
  ) => {
    if (typeof updaterOrValue !== "function") return;
    if (!props.onPageChange) return;

    const requestedFilter = updaterOrValue({
      pageIndex: props.dataTable.meta.page - 1,
      pageSize: props.dataTable.meta.perPage,
    });

    props.onPageChange(requestedFilter);
  };

  return (
    <MaterialReactTable
      state={tableState}
      columns={columns}
      data={props.dataTable.data}
      enableRowSelection={true}
      enableMultiRowSelection={false}
      getRowId={(row) => row.id}
      onRowSelectionChange={setRowSelection}
      positionToolbarAlertBanner={"none"}
      muiTableBodyRowProps={muiTableBodyRowProps}
      localization={{
        ...MRT_Localization_ES,
        noRecordsToDisplay: `No se encontraron ${props.entity.name.plural}`,
        noResultsFound: `No se encontraron resultados de ${props.entity.name.plural}`,
      }}
      enableColumnOrdering={false}
      enableDensityToggle={true}
      enableFullScreenToggle={false}
      enableHiding={false}
      enablePinning={false}
      enableGlobalFilter={false}
      enableColumnFilters={true}
      manualFiltering={true}
      enableFilterMatchHighlighting={true}
      onColumnFiltersChange={onColumnFiltersChangeHandle}
      sortDescFirst
      onSortingChange={onSortingChangeHandle}
      enablePagination={true}
      manualPagination={true}
      positionPagination="both"
      onPaginationChange={onPaginationChange}
      paginateExpandedRows={true}
      rowCount={props.dataTable.meta.itemCount}
      pageCount={props.dataTable.meta.pageCount}
    />
  );
}
