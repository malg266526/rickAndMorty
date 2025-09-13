import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Box } from "@mui/material";
import { useCharacters } from "../../hooks/useCharacters.ts";
import { Spacing } from "../../constants/spacing.ts";
import type { CharacterRow } from "./columns.ts";
import { columns } from "./columns.ts";
import { useFilters } from "../../hooks/useFilters.ts";
import { Pagination } from "../../components/Pagination.tsx";
import { Filters } from "./Filters.tsx";
import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/");

const FIRST_PAGE_INDEX = 1;
const SERVER_PAGE_SIZE = 20;

export const CharactersTable = () => {
  const search = routeApi.useSearch();

  const [pagination, setPagination] = useState({
    pageIndex: search.pageIndex || FIRST_PAGE_INDEX,
    pageSize: search.pageSize || SERVER_PAGE_SIZE,
  });

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
