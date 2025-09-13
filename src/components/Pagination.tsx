import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useUrlUpdate } from "../hooks/useUrlUpdate.ts";

const PageSizes = [5, 10, 20, 30, 40];
const FIRST_PAGE_INDEX = 1;

export type PaginationType = {
  pageIndex: number;
  pageSize: number;
};

interface PaginationProps {
  pagination: PaginationType;
  pagesCount: number;
  setPagination: (pagination: PaginationType) => void;
}

export const Pagination = ({
  pagination,
  pagesCount,
  setPagination,
}: PaginationProps) => {
  const { updateUrl } = useUrlUpdate();

  const setPage = (newPageIndex: number, newPageSize: number) => {
    setPagination({
      pageIndex: newPageIndex,
      pageSize: newPageSize,
    });

    updateUrl({
      pageIndex: newPageIndex,
      pageSize: newPageSize,
    });
  };

  const setPreviousPage = () => {
    const newPageIndex = pagination.pageIndex - 1;
    const newPageSize = pagination.pageSize;

    setPage(newPageIndex, newPageSize);
  };

  const setNextPage = () => {
    const newPageIndex = pagination.pageIndex + 1;
    const newPageSize = pagination.pageSize;

    setPage(newPageIndex, newPageSize);
  };

  const setPageSize = (pageSize: number) => {
    // reset pageIndex to first page when changing pageSize
    setPage(FIRST_PAGE_INDEX, pageSize);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "30%",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Button onClick={setPreviousPage} disabled={pagination.pageIndex === 1}>
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

      <FormControl sx={{ width: 120 }}>
        <InputLabel id="demo-simple-select-label">Page size</InputLabel>
        <Select<number>
          value={pagination.pageSize}
          label="Page size"
          onChange={(event: SelectChangeEvent<number>) =>
            setPageSize(Number(event.target.value))
          }
        >
          {PageSizes.map((pageSize) => (
            <MenuItem value={pageSize}>{pageSize}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
