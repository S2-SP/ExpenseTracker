import React, { useEffect, useState } from "react";
import type { Expense } from "../api/api";
import {
  fetchAllExpenses, fetchDailyExpenses, fetchMonthlyExpenses,
  fetchAnnualExpenses, fetchTravelExpenses
} from "../api/api";
import ExpenseChart from "./ExpenseChart";
import ExpenseModal from "../modal/ExpenseModal";
import { addExpense, updateExpense, deleteExpense } from "../api/api";
import {
  Container, Typography, Box, Grid, Alert, CircularProgress, Stack
} from "@mui/material";
import StatCard from "./StatCard";

const fmt = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [monthly, setMonthly] = useState<any[]>([]);
  const [annual, setAnnual] = useState<any[]>([]);
  const [travel, setTravel] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [allExp, dailyExp, monthlyExp, annualExp, travelExp] = await Promise.all([
        fetchAllExpenses(),
        fetchDailyExpenses(),
        fetchMonthlyExpenses(),
        fetchAnnualExpenses(),
        fetchTravelExpenses(),
      ]);
      setExpenses(allExp || []);
      setDaily(dailyExp || []);
      setMonthly(monthlyExp || []);
      setAnnual(annualExp || []);
      setTravel(travelExp || []);
    } catch (err) {
      setError("Failed to load dashboard data. Is the API running?");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthTotal = expenses
    .filter(e => { const d = new Date(e.date); return d.getMonth() === currentMonth && d.getFullYear() === currentYear; })
    .reduce((sum, e) => sum + e.amount, 0);
  const travelTotal = expenses.filter(e => e.isTravel).reduce((sum, e) => sum + e.amount, 0);
  const uniqueDays = new Set(expenses.map(e => e.date.slice(0, 10))).size;
  const dailyAvg = uniqueDays > 0 ? total / uniqueDays : 0;

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" mt={8} spacing={2}>
        <CircularProgress size={48} />
        <Typography color="text.secondary">Loading dashboard...</Typography>
      </Stack>
    );
  }

  return (
    <Container maxWidth="xl" disableGutters>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview of your expenses
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stat Cards */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total Expenses" value={fmt(total)} variant="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="This Month" value={fmt(monthTotal)} variant="success" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Travel" value={fmt(travelTotal)} variant="warning" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Avg / Day" value={fmt(dailyAvg)} variant="info" />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExpenseChart data={daily} xKey="date" yKey="total" title="Daily Expenses" type="bar" />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExpenseChart data={monthly} xKey="month" yKey="total" title="Monthly Expenses" type="line" />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExpenseChart data={annual} xKey="year" yKey="total" title="Annual Expenses" type="line" />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ExpenseChart
            data={travel}
            pieNameKey="category"
            pieValueKey="amount"
            title="Travel Expenses by Category"
            type="pie"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
