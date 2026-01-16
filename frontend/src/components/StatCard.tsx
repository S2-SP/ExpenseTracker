import { Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  value: string;
  variant?: "primary" | "success" | "warning" | "error" | "info";
}

const gradients = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  success: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  warning: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  error: "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)",
  info: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
};

const StatCard = ({ label, value, variant = "primary" }: StatCardProps) => (
  <Card sx={{ 
    borderRadius: 3,
    background: gradients[variant],
    color: "white",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    }
  }}>
    <CardContent>
      <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;
