import { GlobalStyles } from "@mui/material";

export default function GlobalScrollStyles() {
  return (
    <GlobalStyles
      styles={{
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.3) transparent",
          scrollBehavior: "smooth",
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
          borderRadius: "8px",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "9999px",  // максимально округлённый ползунок
          minHeight: "30px",
          border: "2px solid transparent",
          backgroundClip: "content-box",
          transition: "background-color 0.3s",
          boxShadow: "inset 0 0 1px rgba(255,255,255,0.5)",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(255,255,255,0.6)",
        },
      }}
    />
  );
}
