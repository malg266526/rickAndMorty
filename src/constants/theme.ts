import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#006a4e",
    },
    secondary: {
      main: "#ffb703",
    },
    background: {
      default: "#f4f6f3",
      paper: "#ffffff",
    },
    text: {
      primary: "#1b1b1b",
      secondary: "#fdfdfd",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#006a4e", // button color
          color: "#fff",
          "&:hover": {
            backgroundColor: "#00553d",
          },
        },
      },
    },
  },
});
