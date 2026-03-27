import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  variant?: "primary" | "success" | "warning" | "error" | "info";
  icon?: ReactNode;
}

const gradients: Record<string, string> = {
  primary: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
  success: "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)",
  warning: "linear-gradient(135deg, #e65100 0%, #fb8c00 100%)",
  error:   "linear-gradient(135deg, #b71c1c 0%, #e53935 100%)",
  info:    "linear-gradient(135deg, #0277bd 0%, #039be5 100%)",
};

const StatCard = ({ label, value, variant = "primary", icon }: StatCardProps) => (
  <Card
    sx={{
      borderRadius: 3,
      background: gradients[variant],
      color: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      },
    }}
  >
    <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.8 }}>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, lineHeight: 1.2 }}>
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box sx={{ opacity: 0.75, mt: 0.5 }}>
            {icon}
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
