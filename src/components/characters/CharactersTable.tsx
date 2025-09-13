import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Box } from "@mui/material";
import { useCharacters } from "../../hooks/useCharacters.ts";
import { Spacing } from "../../constants/spacing.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import type { CharacterRow } from "./columns.ts";
import { columns } from "./columns.ts";
import { useFilters } from "../../hooks/useFilters.ts";
import { Pagination } from "./Pagination.tsx";
import type { Status } from "../../types/character.ts";
import { Filters } from "./Filters.tsx";

export const CharactersTable = () => {
  const {
    pagination,
    setPreviousPage,
    setNextPage,
    setPagination,
    setPageSize,
  } = usePagination();

  const { columnFilters, setValueByColumnId, getColumnById, clearFilters } =
    useFilters();

  const charactersResult = useCharacters(
    pagination.pageIndex,
    pagination.pageSize,
  );

  const pagesCount = charactersResult.data?.info.pages;

  const table = useReactTable<CharacterRow>({
    data: charactersResult.data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnFilters,
    },
    pageCount: pagesCount,
    getFilteredRowModel: getFilteredRowModel(),
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
      <Filters
        name={getColumnById("name").value || ""}
        setName={(name: string) => {
          setValueByColumnId({
            id: "name",
            value: name,
          });
        }}
        statuses={getColumnById("status")?.value || []}
        setStatuses={(statuses: Status[]) =>
          setValueByColumnId({ id: "status", value: statuses })
        }
        clearFilters={clearFilters}
      />

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

      <Pagination
        pagination={pagination}
        setPreviousPage={setPreviousPage}
        pagesCount={pagesCount}
        setNextPage={setNextPage}
        setPageSize={setPageSize}
      />
    </Box>
  );
};
