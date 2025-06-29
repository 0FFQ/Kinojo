import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e", // Чёрный фон страницы
      paper: "#121212", // Фон компонентов
    },
    text: {
      primary: "#ffffff", // Белый цвет текста
    },
  },
});

export default darkTheme;
