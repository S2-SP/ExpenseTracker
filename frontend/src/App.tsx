import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from "@mui/material";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ExpensesTable from "./components/ExpensesTable";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname === "/expenses" ? 1 : 0;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/");
    else if (newValue === 1) navigate("/expenses");
  };

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700}>
            Expense Tracker
          </Typography>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Dashboard" />
            <Tab label="Expenses" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpensesTable />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
