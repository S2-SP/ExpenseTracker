import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Tabs, Tab, Box,
  useMediaQuery, useTheme, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ExpensesTable from "./components/ExpensesTable";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon fontSize="small" /> },
  { label: "Expenses", path: "/expenses", icon: <ReceiptLongIcon fontSize="small" /> },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentTab = location.pathname === "/expenses" ? 1 : 0;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(NAV_ITEMS[newValue].path);
  };

  const handleDrawerNav = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" elevation={2} sx={{ background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: { xs: 56, sm: 64 } }}>
          <Box display="flex" alignItems="center" gap={1}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                aria-label="open menu"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight={700}
              letterSpacing={0.5}
              noWrap
            >
              Expense Tracker
            </Typography>
          </Box>

          {!isMobile && (
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              {NAV_ITEMS.map((item) => (
                <Tab key={item.path} label={item.label} icon={item.icon} iconPosition="start" />
              ))}
            </Tabs>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <Box sx={{ p: 2, background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)" }}>
            <Typography variant="subtitle1" fontWeight={700} color="white">
              Expense Tracker
            </Typography>
          </Box>
          <Divider />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleDrawerNav(item.path)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "primary.light",
                      color: "primary.main",
                      "& .MuiListItemText-primary": { fontWeight: 700 },
                    },
                  }}
                >
                  <Box mr={1.5} display="flex" alignItems="center" color="inherit">
                    {item.icon}
                  </Box>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpensesTable />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
