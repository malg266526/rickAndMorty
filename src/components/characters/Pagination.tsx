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
import type { Pagination as PaginationType } from "../../hooks/usePagination.ts";

const PageSizes = [5, 10, 20, 30, 40];

interface PaginationProps {
  pagination: PaginationType;
  setPreviousPage: () => void;
  pagesCount: number;
  setNextPage: () => void;
  setPageSize: (size: number) => void;
}

export const Pagination = ({
  pagination,
  setPreviousPage,
  setNextPage,
  pagesCount,
  setPageSize,
}: PaginationProps) => {
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
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select<number>
          value={pagination.pageSize}
          label="Age"
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
