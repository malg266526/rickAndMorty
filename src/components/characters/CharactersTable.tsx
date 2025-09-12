import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useCharacters } from "../../hooks/useCharacters.ts";
import { Spacing } from "../../constants/spacing.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import type { CharacterRow } from "./columns.ts";
import { columns } from "./columns.ts";
import { statuses, useFilters } from "../../hooks/useFilters.ts";
import { Pagination } from "./Pagination.tsx";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CharactersTable = () => {
  const {
    pagination,
    setPreviousPage,
    setNextPage,
    setPagination,
    setPageSize,
  } = usePagination();

  const {
    columnFilters,
    setValueByColumnId,
    getColumnById,
    setMultipleByColumnId,
    clearFilters,
  } = useFilters();

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={getColumnById("name")?.value}
          onChange={(event) =>
            setValueByColumnId({
              id: "name",
              value: event.target.value,
            })
          }
          placeholder="Filter by name"
          sx={{
            "& .MuiInputLabel-root": {
              color: "primary.main", // default
            },
          }}
        />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel
            sx={{ color: "primary.main" }}
            id="character-status-checkbox-label"
          >
            Status
          </InputLabel>
          <Select
            multiple
            value={getColumnById("status")?.value}
            defaultValue={[]}
            onChange={(event: any) => {
              setMultipleByColumnId("status", event.target.value);
            }}
            input={<OutlinedInput label="Status" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {statuses.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  checked={getColumnById("status")?.value.includes(name)}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ width: 200 }} onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>
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
