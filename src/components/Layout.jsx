import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./pages/ui/Footer";
import Navbar from "./pages/ui/Navbar";

export default function Layout() {
  return (
    <div>
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
