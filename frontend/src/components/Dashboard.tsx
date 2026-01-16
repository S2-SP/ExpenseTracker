import React, { useEffect, useState } from "react";
import type { Expense } from "../api/api";
import { fetchAllExpenses, fetchDailyExpenses, fetchMonthlyExpenses, fetchAnnualExpenses, fetchTravelExpenses, addExpense, updateExpense, deleteExpense } from "../api/api";
import ExpenseChart from "./ExpenseChart";
import ExpenseModal from "../modal/ExpenseModal";
import { Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Box, Grid } from "@mui/material";
import StatCard from "./StatCard";
//import ExpensesTable from "./ExpensesTable";

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [monthly, setMonthly] = useState<any[]>([]);
  const [annual, setAnnual] = useState<any[]>([]);
  const [travel, setTravel] = useState<Expense[]>([]);


  const loadData = async () => {
    try{
      setExpenses(await fetchAllExpenses());
      setDaily(await fetchDailyExpenses());
      setMonthly(await fetchMonthlyExpenses());
      setAnnual(await fetchAnnualExpenses());
      setTravel(await fetchTravelExpenses());
    }catch(error){
      console.error("Error loading data:", error);
    } 

  };

  useEffect(() => { loadData(); }, []);
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthTotal = expenses
  .filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  })
  .reduce((sum, e) => sum + e.amount, 0);

const travelTotal = expenses
  .filter(e => e.isTravel)
  .reduce((sum, e) => sum + e.amount, 0);

const uniqueDays = new Set(expenses.map(e => e.date.slice(0, 10))).size;
const dailyAvg = uniqueDays > 0 ? total / uniqueDays : 0;


  return (
    <Container>
      <Typography variant="h4" gutterBottom>Expense Tracker Dashboard</Typography>

      <Grid container spacing={3} mb={3}>
        <Grid xs={12} md={3}><StatCard label="Total Expenses" value={`$${total}`} /></Grid>
        <Grid xs={12} md={3}><StatCard label="This Month" value={`$${monthTotal}`} /></Grid>
        <Grid xs={12} md={3}><StatCard label="Travel" value={`$${travelTotal}`} /></Grid>
        <Grid xs={12} md={3}><StatCard label="Avg / Day" value={`$${dailyAvg}`} /></Grid>
      </Grid>


      {/* Charts */}
    <Grid container spacing={3}>
  {/* Daily → Bar */}
      <Grid xs={12} md={6}>
        <ExpenseChart data={daily} xKey="date" yKey="total" title="Daily Expenses" type="bar" />
      </Grid>

      {/* Monthly → Line */}
      <Grid xs={12} md={6}>
        <ExpenseChart data={monthly} xKey="month" yKey="total" title="Monthly Expenses" type="line" />
      </Grid>

      {/* Annual → Line */}
      <Grid xs={12} md={6}>
        <ExpenseChart data={annual} xKey="year" yKey="total" title="Annual Expenses" type="line" />
      </Grid>

      {/* Travel → Pie */}
      <Grid xs={12} md={6}>
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
