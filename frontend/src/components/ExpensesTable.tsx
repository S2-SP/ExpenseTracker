import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  Button, Box, CircularProgress, Stack,
  Chip, useMediaQuery, useTheme, Card,
  CardContent, CardActions, Divider, Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightIcon from "@mui/icons-material/Flight";
import { addExpense, deleteExpense, fetchAllExpenses, updateExpense, type Expense } from "../api/api";
import ExpenseModal from "../modal/ExpenseModal";

const ExpensesTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | undefined>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllExpenses();
      setExpenses(data || []);
    } catch (err) {
      setError("Failed to load expenses. Is the API running?");
      console.error("Error loading data:", err);
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

  const openAdd = () => { setEditExpense(undefined); setModalOpen(true); };
  const openEdit = (e: Expense) => { setEditExpense(e); setModalOpen(true); };

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" mt={6} spacing={2}>
        <CircularProgress size={48} />
        <Typography color="text.secondary">Loading expenses...</Typography>
      </Stack>
    );
  }

  const header = (
    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
      <Box>
        <Typography variant="h5" fontWeight={700}>All Expenses</Typography>
        <Typography variant="body2" color="text.secondary">
          {expenses.length} {expenses.length === 1 ? "record" : "records"}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={openAdd}
        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
      >
        Add Expense
      </Button>
    </Box>
  );

  if (error) {
    return (
      <>
        {header}
        <Alert severity="error">{error}</Alert>
      </>
    );
  }

  if (!expenses.length) {
    return (
      <>
        {header}
        <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>No expenses yet</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Start by adding your first expense.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
            Add Expense
          </Button>
        </Paper>
        <ExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAdd} />
      </>
    );
  }

  // Mobile card list
  if (isMobile) {
    return (
      <>
        {header}
        <Stack spacing={2}>
          {expenses.map(e => (
            <Card key={e.id} elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    ${e.amount.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {e.date.slice(0, 10)}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} color="primary" gutterBottom>
                  {e.category}
                </Typography>
                {e.description && (
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {e.description}
                  </Typography>
                )}
                {e.isTravel && (
                  <Chip
                    icon={<FlightIcon />}
                    label="Travel"
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
              </CardContent>
              <Divider />
              <CardActions sx={{ px: 2, py: 1 }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => openEdit(e)}
                  sx={{ textTransform: "none" }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(e.id)}
                  sx={{ textTransform: "none" }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
        <ExpenseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={editExpense ? handleUpdate : handleAdd}
          initialData={editExpense}
        />
      </>
    );
  }

  // Desktop table
  return (
    <>
      {header}
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: 700, bgcolor: "grey.50" } }}>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Travel</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(e => (
              <TableRow key={e.id} hover sx={{ "&:last-child td": { border: 0 } }}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>{e.date.slice(0, 10)}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>{e.category}</Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                  ${e.amount.toFixed(2)}
                </TableCell>
                <TableCell sx={{ maxWidth: 220 }}>
                  <Typography variant="body2" noWrap title={e.description}>
                    {e.description || "—"}
                  </Typography>
                </TableCell>
                <TableCell>
                  {e.isTravel
                    ? <Chip icon={<FlightIcon />} label="Yes" size="small" color="info" variant="outlined" />
                    : <Typography variant="body2" color="text.secondary">No</Typography>
                  }
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => openEdit(e)}
                      sx={{ textTransform: "none" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(e.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={editExpense ? handleUpdate : handleAdd}
        initialData={editExpense}
      />
    </>
  );
};

export default ExpensesTable;
