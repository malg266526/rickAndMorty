import { Box, IconButton } from "@mui/material";
import { Link } from "@tanstack/react-router";
import EditIcon from "@mui/icons-material/Edit";

interface ActionCellProps {
  id: number;
}

export const ActionCell = ({ id }: ActionCellProps) => {
  return (
    <Box>
      <Link to="/character/$id" params={{ id: id.toString() }}>
        <IconButton aria-label="edit" size="small" color="primary">
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Link>
    </Box>
  );
};
