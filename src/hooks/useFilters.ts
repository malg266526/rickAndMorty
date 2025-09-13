import { useMemo, useState } from "react";
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

  const setValueByColumnId = (filter: ColumnFilter) => {
    const updated = columnFilters.map((column) => {
      if (column.id === filter.id) {
        return filter;
      }

      return column;
    });
    setColumnFilters(updated);
  };

  function getColumnById(id: "name"): Extract<ColumnFilter, { id: typeof id }>;
  function getColumnById(
    id: "status",
  ): Extract<ColumnFilter, { id: typeof id }>;

  function getColumnById<ColumnId extends ColumnFilter["id"]>(
    columnId: ColumnId,
  ) {
    if (columnId === "status") {
      return columnFilters.find((column) => column.id === columnId);
    }
    return columnFilters.find((column) => column.id === columnId);
  }

  const clearFilters = () => setColumnFilters(filtersInitialState);

  return useMemo(
    () => ({
      columnFilters,
      setValueByColumnId,
      getColumnById,
      clearFilters,
    }),
    [columnFilters, getColumnById, setValueByColumnId],
  );
};
