import React, { useState, useEffect } from "react";
import type { Expense } from "../api/api";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, "id">) => void;
  initialData?: Expense;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ open, onClose, onSave, initialData }) => {
 const [formData, setFormData] = useState({ amount: 0, category: "", date: "", description: "" });

  // Reset form only when modal opens
  useEffect(() => {
    if (open) {
      setFormData(
        initialData
          ? {
              amount: initialData.amount,
              category: initialData.category,
              date: initialData.date.slice(0, 10),
              description: initialData.description || "",
            }
          : {
              amount: 0,
              category: "",
              date: new Date().toISOString().slice(0, 10),
              description: "",
            }
      );
    }
  }, [open, initialData]);


  const { amount, category, date, description } = formData;

  const handleSave = () => {
    onSave({ amount, category, date, description });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Update Expense" : "Add Expense"}</DialogTitle>
      <DialogContent className="flex flex-col gap-3 mt-2">
        <TextField label="Amount" type="number" fullWidth value={amount} onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value) })} />
        <TextField label="Category" fullWidth value={category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
        <TextField label="Date" type="date" fullWidth value={date} onChange={e => setFormData({ ...formData, date: e.target.value })} InputLabelProps={{ shrink: true }} />
        <TextField label="Description" fullWidth value={description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>{initialData ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseModal;
