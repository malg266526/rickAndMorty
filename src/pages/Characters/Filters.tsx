import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { StatusOptions as PossibleStatuses } from "../../hooks/useFilters.ts";

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

interface FiltersProps {
  name: string;
  setName: (nameValue: string) => void;
  statuses: Status[];
  setStatuses: (statuses: Status[]) => void;
  clearFilters: () => void;
}

export const Filters = ({
  name,
  setName,
  statuses,
  setStatuses,
  clearFilters,
}: FiltersProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
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
        <Select<Status[]>
          multiple
          value={statuses}
          defaultValue={[]}
          onChange={(event) => {
            const value = event.target.value;
            if (Array.isArray(value)) {
              setStatuses(value);
            } else {
              setStatuses([]);
            }
          }}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {PossibleStatuses.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={statuses.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={{ width: 200, height: 46 }} onClick={clearFilters}>
        Clear Filters
      </Button>
    </Box>
  );
};
