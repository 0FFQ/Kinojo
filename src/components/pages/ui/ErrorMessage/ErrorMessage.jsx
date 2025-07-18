import { Box, Typography } from "@mui/material";
import React from "react";

export default function ErrorMessage() {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      margin="auto"
      textAlign="center"
    >
      <Typography variant="h6">Произошла ошибка <br /> попробуйте обновить страницу</Typography>
    </Box>
  );
}
