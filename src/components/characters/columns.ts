// row shape
import { createColumnHelper } from "@tanstack/react-table";
import type { Character } from "../../types/character.ts";

export type CharacterColumns = "id" | "name" | "status" | "species";

export type CharacterRow = Pick<Character, CharacterColumns>;

const columnHelper = createColumnHelper<CharacterRow>();

export const columns = [
  columnHelper.accessor((row) => row.name, {
    id: "name",
    header: () => "Name",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: () => "Status",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor((row) => row.species, {
    id: "species",
    header: () => "Species",
    cell: (info) => info.renderValue(),
  }),
];
