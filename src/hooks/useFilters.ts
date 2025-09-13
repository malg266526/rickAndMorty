import { useCallback, useMemo, useState } from "react";
import type { Status } from "../types/character.ts";

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

export const Statuses = ["Alive", "Dead", "unknown"] as const;

const filtersInitialState: ColumnFiltersState = [
  {
    id: "name",
    value: "",
  },
  { id: "status", value: [] },
];

export const useFilters = () => {
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(filtersInitialState);

  const setValueByColumnId = useCallback(
    (filter: ColumnFilter) => {
      const updated = columnFilters.map((column) => {
        if (column.id === filter.id) {
          return filter;
        }

        return column;
      });
      setColumnFilters(updated);
    },
    [columnFilters],
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

  const clearFilters = () => setColumnFilters(filtersInitialState);

  return useMemo(
    () => ({
      columnFilters,
      setValueByColumnId,
      getColumnById: getFilterById,
      clearFilters,
    }),
    [columnFilters, getFilterById, setValueByColumnId],
  );
};
