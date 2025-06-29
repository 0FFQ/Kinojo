import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: "row" },
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        marginTop: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} &laquo;kinojo&raquo; 18+ <br />
        Все права принадлежат правообладателям.
      </Typography>
      <Typography variant="h4">
        Kinojo
      </Typography>
    </Stack>
  );
}
