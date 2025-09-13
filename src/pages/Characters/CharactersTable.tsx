import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Box } from "@mui/material";
import { usePaginatedDataRickAndMortyCharacters } from "./usePaginatedDataRickAndMortyCharacters.ts";
import { Spacing } from "../../constants/spacing.ts";
import type { CharacterRow } from "./columns.tsx";
import { columns } from "./columns.tsx";
import { useFilters } from "../../hooks/useFilters.ts";
import { Pagination } from "../../components/Pagination.tsx";
import type { PaginationType } from "../../components/Pagination.tsx";
import { Filters } from "./Filters.tsx";

interface CharactersTableProps {
  pagination: PaginationType;
  setPagination: (pagination: PaginationType) => void;
  characters: Character[];
}

export const CharactersTable = ({
  pagination,
  characters,
  setPagination,
}: CharactersTableProps) => {
  const { columnFilters, setValueByColumnId, getColumnById, clearFilters } =
    useFilters();

  const charactersResult = usePaginatedDataRickAndMortyCharacters(
    pagination.pageIndex,
    pagination.pageSize,
  );

  const pagesCount = charactersResult.data?.info.pages;

  const table = useReactTable<CharacterRow>({
    data: characters || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      columnFilters,
    },
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
        setPagination={setPagination}
        pagesCount={pagesCount}
      />
    </Box>
  );
};
