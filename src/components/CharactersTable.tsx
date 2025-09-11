import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Character } from "../types/character.ts";
import { Box, Button, Typography } from "@mui/material";
import { useCharacters } from "../hooks/useCharacters.ts";
import { Spacing } from "../constants/spacing.ts";
import { usePagination } from "../hooks/usePagination.ts";

// row shape
type CharacterRow = Pick<Character, "id" | "name" | "status" | "species">;

const columnHelper = createColumnHelper<CharacterRow>();

const columns = [
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

export const CharactersTable = () => {
  const { pagination, setPreviousPage, setNextPage, setPagination } =
    usePagination();

  const charactersResult = useCharacters(
    pagination.pageIndex,
    //pagination.pageSize,
  );

  const pagesCount = charactersResult.data?.info.pages;

  const table = useReactTable<CharacterRow>({
    data: charactersResult.data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // rowCount: dataQuery.data?.rowCount,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      //...
      pagination,
    },
    pageCount: pagesCount,
  });

  const { getHeaderGroups, getRowModel } = table;
  const headerGroup = getHeaderGroups()[0];
  const rows = getRowModel().rows;

  return (
    <Box
      sx={{
        display: "flex",
        gap: Spacing.lg,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="table" sx={{ width: "50%" }}>
        <thead>
          <tr>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="p-2 border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button onClick={setPreviousPage} disabled={pagination.pageIndex === 0}>
          Prev
        </Button>
        <Typography sx={{ minWidth: 100 }}>
          page {pagination.pageIndex} / {pagesCount}
        </Typography>
        <Button
          onClick={setNextPage}
          disabled={pagination.pageIndex === pagesCount}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
