import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const Menu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        borderBottom: 1,
        height: "100px",
        backgroundColor: "primary.main",
      }}
    >
      <Link to="/" className="[&.active]:font-bold">
        <Typography sx={{ minWidth: 100, color: "text.secondary" }}>
          Home
        </Typography>
      </Link>
    </Box>
  );
};
