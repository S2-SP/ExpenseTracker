import React, { useState, useEffect } from "react";
import type { Expense } from "../api/api";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,FormControlLabel, Switch, Stack, Typography, Checkbox } from "@mui/material";

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, "id">) => void;
  initialData?: Expense;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ open, onClose, onSave, initialData }) => {
 const [formData, setFormData] = useState({ amount: 0, category: "", date: "", description: "", isTravel: false });

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
              isTravel: initialData.isTravel || false,
            }
          : {
              amount: 0,
              category: "",
              date: new Date().toISOString().slice(0, 10),
              description: "",
              isTravel: false,
            }
      );
    }
  }, [open, initialData]);


  const { amount, category, date, description, isTravel } = formData;

  const handleSave = () => {
    // Convert date to ISO 8601 format with time
    const fullDateTime = new Date(date).toISOString();
    onSave({ amount, category, date: fullDateTime, description, isTravel });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
  <DialogTitle>
    <Typography variant="h6" fontWeight={600}>
      {initialData ? "Update Expense" : "Add Expense"}
    </Typography>
  </DialogTitle>

  <DialogContent>
    <Stack spacing={2.5} mt={1}>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: parseFloat(e.target.value) })
        }
        fullWidth
      />

      <TextField
        label="Category"
        value={category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        fullWidth
      />

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) =>
          setFormData({ ...formData, date: e.target.value })
        }
        InputLabelProps={{ shrink: true }}
        fullWidth
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        fullWidth
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isTravel}
            onChange={(e) =>
              setFormData({ ...formData, isTravel: e.target.checked })
            }
          />
        }
        label="Is this a travel expense?"
      />
    </Stack>
  </DialogContent>

  <DialogActions sx={{ padding: 2 }}>
    <Button onClick={onClose}>Cancel</Button>
    <Button variant="contained" onClick={handleSave}>
      {initialData ? "Update" : "Add"}
    </Button>
  </DialogActions>
</Dialog>

  );
};

export default ExpenseModal;
