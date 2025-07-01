import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./pages/ui/Footer";
import Navbar from "./pages/ui/Navbar";
import GlobalScrollStyles from "./pages/ui/Scroll/CustomScrollAutocomplete"; // путь подкорректируй, если другой

export default function Layout() {
  return (
    <div>
      <GlobalScrollStyles />
      <Container
        fixed
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box sx={{ p: 4.3 }} />
        <Outlet />
        <Footer />
      </Container>
    </div>
  );
}
