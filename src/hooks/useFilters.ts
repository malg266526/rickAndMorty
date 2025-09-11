import { useCallback, useMemo, useState } from "react";
import type {
  CharacterColumns,
  CharacterRow,
} from "../components/characters/columns.ts";

type FilterValue = CharacterRow[CharacterColumns];

interface ColumnFilter {
  id: CharacterColumns;
  value: FilterValue;
}

type ColumnFiltersState = ColumnFilter[];

const filtersInitialState: ColumnFiltersState = [
  {
    id: "name",
    value: "",
  },
];

export const useFilters = () => {
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(filtersInitialState);

  const setValueByColumnId = useCallback(
    (id: CharacterColumns, value: FilterValue) => {
      const updated = columnFilters.map((column) =>
        column.id === id ? { ...column, value } : column,
      );
      setColumnFilters(updated);
    },
    [columnFilters],
  );

  const getValueByColumnId = useCallback(
    (id: CharacterColumns) => {
      return columnFilters.find((column) => column.id === id).value;
    },
    [columnFilters],
  );

  const filters = useMemo(
    () => ({
      columnFilters,
      setColumnFilters,
      setValueByColumnId,
      getValueByColumnId,
    }),
    [columnFilters, setValueByColumnId, getValueByColumnId],
  );

  return filters;
};
