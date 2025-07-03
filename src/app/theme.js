import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Comic Relief', system-ui",
  },
});

export default darkTheme;
