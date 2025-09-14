import { Button } from "@mui/material";

interface RefetchButton {
  refetch: () => void;
}

export const RefetchButton = ({ refetch }: RefetchButton) => {
  return (
    <Button sx={{ width: 200, height: 46 }} onClick={refetch}>
      Refresh data
    </Button>
  );
};
