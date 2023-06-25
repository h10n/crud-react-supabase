import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  Box,
  Container,
  CssBaseline,
  createTheme,
  Grid,
  ThemeProvider,
  Toolbar,
} from "@mui/material";

import Breadcrumbs from "@/components/Breadcrumbs";

import Navbar from "./components/Navbar/index";
import Sidebar from "./components/Sidebar";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar toggleDrawer={toggleDrawer} open={open} />
        <Sidebar toggleDrawer={toggleDrawer} open={open} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Breadcrumbs />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Outlet />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
