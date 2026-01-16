import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  Button,
  Box,
  CircularProgress,
  Stack
} from "@mui/material";
import { addExpense, deleteExpense, fetchAllExpenses, updateExpense, type Expense } from "../api/api";
import ExpenseModal from "../modal/ExpenseModal";

const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | undefined>();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchAllExpenses();
      setExpenses(data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAdd = async (expense: Omit<Expense, "id">) => {
    await addExpense(expense);
    loadData();
  };

  const handleUpdate = async (expense: Omit<Expense, "id">) => {
    if (editExpense) {
      await updateExpense(editExpense.id, expense);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this expense?")) {
      await deleteExpense(id);
      loadData();
    }
  };

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" mt={4}>
        <CircularProgress />
        <Typography mt={2}>Loading expenses...</Typography>
      </Stack>
    );
  }

  if (!expenses || expenses.length === 0) {
    return <Typography mt={4}>No expenses available</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, p: 2 }}>
      {/* Header */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">All Expenses</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => { setEditExpense(undefined); setModalOpen(true); }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Travel</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(e => (
            <TableRow key={e.id} hover>
              <TableCell>{e.date.slice(0, 10)}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>${e.amount.toFixed(2)}</TableCell>
              <TableCell>{e.description}</TableCell>
              <TableCell>{e.isTravel ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => { setEditExpense(e); setModalOpen(true); }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(e.id)}
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <ExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={editExpense ? handleUpdate : handleAdd}
        initialData={editExpense}
      />
    </TableContainer>
  );
};

export default ExpensesTable;
