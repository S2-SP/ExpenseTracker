import React, { useState, useEffect } from "react";
import type { Expense } from "../api/api";
import {
  Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, Button, FormControlLabel,
  Checkbox, Stack, Typography, IconButton,
  InputAdornment, useMediaQuery, useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, "id">) => void;
  initialData?: Expense;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    amount: 0, category: "", date: "", description: "", isTravel: false
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    const fullDateTime = new Date(date).toISOString();
    onSave({ amount, category, date: fullDateTime, description, isTravel });
    onClose();
  };

  const isValid = amount > 0 && category.trim() !== "" && date !== "";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={fullScreen}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h6" fontWeight={700}>
          {initialData ? "Update Expense" : "Add Expense"}
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5} mt={0.5}>
          <TextField
            label="Amount"
            type="number"
            value={amount || ""}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            inputProps={{ min: 0, step: "0.01" }}
            fullWidth
            required
          />

          <TextField
            label="Category"
            value={category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g. Food, Transport, Hotel"
            fullWidth
            required
          />

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Optional note"
            fullWidth
            multiline
            rows={2}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isTravel}
                onChange={(e) => setFormData({ ...formData, isTravel: e.target.checked })}
                color="primary"
              />
            }
            label="This is a travel expense"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isValid}
          sx={{ textTransform: "none", fontWeight: 600, minWidth: 100 }}
        >
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseModal;
