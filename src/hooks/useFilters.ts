import { useCallback, useMemo, useState } from "react";
import { useUrlUpdate } from "./useUrlUpdate.ts";
import { getRouteApi } from "@tanstack/react-router";

type ColumnFilter =
  | {
      id: "name";
      value: string;
    }
  | {
      id: "status";
      value: Status[];
    };

type ColumnFiltersState = ColumnFilter[];

// not validated by types
export const StatusOptions = ["Alive", "Dead", "unknown"] as const;

const getInitialFilters = (
  name: string = "",
  status: Status[] = [],
): ColumnFiltersState => {
  return [
    {
      id: "name",
      value: name,
    },
    { id: "status", value: status },
  ];
};

const routeApi = getRouteApi("/");

export const useFilters = () => {
  const search = routeApi.useSearch();

  const { updateUrl, clearFilters: clearFilterParams } = useUrlUpdate();

  const initialState: ColumnFiltersState = getInitialFilters(
    search.name,
    search.status,
  );
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialState);

  const setValueByColumnId = useCallback(
    (filter: ColumnFilter) => {
      const updated = columnFilters.map((column) => {
        if (column.id === filter.id) {
          return filter;
        }

        return column;
      });
      setColumnFilters(updated);
      updateUrl({
        [filter.id]: filter.value,
      });
    },
    [columnFilters, updateUrl],
  );

  function getFilterById(id: "name"): Extract<ColumnFilter, { id: typeof id }>;
  function getFilterById(
    id: "status",
  ): Extract<ColumnFilter, { id: typeof id }>;

  function getFilterById<ColumnId extends ColumnFilter["id"]>(
    columnId: ColumnId,
  ) {
    return columnFilters.find((column) => column.id === columnId);
  }

  const clearFilters = useCallback(() => {
    setColumnFilters(getInitialFilters());
    clearFilterParams();
  }, [clearFilterParams]);

  return useMemo(
    () => ({
      columnFilters,
      setValueByColumnId,
      getColumnById: getFilterById,
      clearFilters,
    }),
    [clearFilters, columnFilters, getFilterById, setValueByColumnId],
  );
};
