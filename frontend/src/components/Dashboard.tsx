import React, { useEffect, useState } from "react";
import type { Expense } from "../api/api";
import { fetchAllExpenses, fetchDailyExpenses, fetchMonthlyExpenses, fetchAnnualExpenses, fetchTravelExpenses, addExpense, updateExpense, deleteExpense } from "../api/api";
import ExpenseChart from "./ExpenseChart";
import ExpenseModal from "../modal/ExpenseModal";
import { Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [monthly, setMonthly] = useState<any[]>([]);
  const [annual, setAnnual] = useState<any[]>([]);
  const [travel, setTravel] = useState<Expense[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | undefined>();

  const loadData = async () => {
    setExpenses(await fetchAllExpenses());
    setDaily(await fetchDailyExpenses());
    setMonthly(await fetchMonthlyExpenses());
    setAnnual(await fetchAnnualExpenses());
    setTravel(await fetchTravelExpenses());
  };

  useEffect(() => { loadData(); }, []);

  const handleAdd = async (expense: Omit<Expense, "id">) => { await addExpense(expense); loadData(); };
  const handleUpdate = async (expense: Omit<Expense, "id">) => { if(editExpense){ await updateExpense(editExpense.id, expense); loadData(); } };
  const handleDelete = async (id: string) => { if(confirm("Delete this expense?")) { await deleteExpense(id); loadData(); } };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Expense Tracker Dashboard</Typography>

      {/* Charts */}
      <ExpenseChart data={daily} xKey="Date" yKey="Total" title="Daily Expenses" />
      <ExpenseChart data={monthly} xKey="Month" yKey="Total" title="Monthly Expenses" />
      <ExpenseChart data={annual} xKey="Year" yKey="Total" title="Annual Expenses" />
      <ExpenseChart data={travel} xKey="description" yKey="amount" title="Travel Expenses" />

      {/* Table */}
      <Box mt={4} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">All Expenses</Typography>
        <Button variant="contained" color="success" onClick={() => { setEditExpense(undefined); setModalOpen(true); }}>Add Expense</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.date.slice(0,10)}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>{e.amount}</TableCell>
              <TableCell>{e.description}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small" onClick={() => { setEditExpense(e); setModalOpen(true); }}>Update</Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(e.id)} style={{ marginLeft: 8 }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={editExpense ? handleUpdate : handleAdd} initialData={editExpense} />
    </Container>
  );
};

export default Dashboard;
