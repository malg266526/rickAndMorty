import { useCallback, useMemo, useState } from "react";
import type { CharacterRow } from "../components/characters/columns.ts";

type MultipleValuesFilters = "status";

export type PossibleStatuses = CharacterRow["status"];

type ColumnFilter =
  | {
      id: "name";
      value: string;
    }
  | {
      id: "status";
      value: PossibleStatuses[];
    };

type ColumnFiltersState = ColumnFilter[];

export const statuses = ["Alive", "Dead", "unknown"] as const;

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

  const setMultipleByColumnId = useCallback(
    <
      FilterId extends MultipleValuesFilters,
      Value extends Extract<ColumnFilter, { id: FilterId }>["value"],
    >(
      id: FilterId,
      value: Value,
    ) => {
      const updated = columnFilters.map((column) => {
        if (column.id === id) {
          return { ...column, value };
        }

        return column;
      });

      setColumnFilters(updated);
    },
    [columnFilters],
  );

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
  // const getColumnById = <ColumnId extends ColumnFilter["id"]>(
  //   columnId: ColumnId,
  // ): Extract<ColumnFilter, { id: ColumnId }> | undefined => {
  //   if (columnId === "status") {
  //     // FIXME: conditional return in functions requires explicit types on each return
  //     return columnFilters.find((column) => column.id === columnId) as
  //       | Extract<ColumnFilter, { id: ColumnId }>
  //       | undefined;
  //   }
  //   // FIXME: conditional return in functions requires explicit types on each return
  //   return columnFilters.find((column) => column.id === columnId) as
  //     | Extract<ColumnFilter, { id: ColumnId }>
  //     | undefined;
  // };

  const filters = useMemo(
    () => ({
      columnFilters,
      setValueByColumnId,
      getColumnById,
      setMultipleByColumnId,
    }),
    [columnFilters],
  );

  return filters;
};
