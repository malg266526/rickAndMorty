import { createColumnHelper } from "@tanstack/react-table";

export type CharacterColumns = "id" | "name" | "status" | "species";

export type CharacterRow = Pick<Character, CharacterColumns>;

const columnHelper = createColumnHelper<CharacterRow>();

export const columns = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: () => "Name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: () => "Status",
    cell: (info) => info.renderValue(),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  }),
  columnHelper.accessor((row) => row.species, {
    id: "species",
    header: () => "Species",
    cell: (info) => info.renderValue(),
  }),
];
