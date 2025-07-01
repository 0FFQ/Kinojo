import { GlobalStyles } from "@mui/material";

export default function GlobalScrollStyles() {
  return (
    <GlobalStyles
      styles={{
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.25) transparent",
        },
        "*::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
          borderRadius: "10px",
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.25)", // чуть светлее, но прозрачнее
          borderRadius: "10px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.35)", // чуть светлее на ховере, но не белый
        },
      }}
    />
  );
}
