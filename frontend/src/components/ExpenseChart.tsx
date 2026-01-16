import React from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Box, Typography, Paper, Fade } from "@mui/material";

interface ExpenseChartProps {
  data: any[];
  xKey?: string;
  yKey?: string;
  title: string;
  type: "bar" | "line" | "pie";
  pieNameKey?: string; // for Pie chart category
  pieValueKey?: string; // for Pie chart value
}

const COLORS = ["#1976d2", "#ff9800", "#4caf50", "#e91e63", "#9c27b0", "#00bcd4"];

const ExpenseChart: React.FC<ExpenseChartProps> = ({
  data,
  xKey,
  yKey,
  title,
  type,
  pieNameKey,
  pieValueKey
}) => {
  const hasData = data && data.length > 0;

  return (
    <Fade in timeout={600}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          height: 350,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1}>
          {title}
        </Typography>

        {hasData ? (
          <Box flex={1}>
            <ResponsiveContainer width="100%" height="100%">
              {type === "bar" && xKey && yKey && (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={yKey} fill="#f66f00ff" animationDuration={800} />
                </BarChart>
              )}

              {type === "line" && xKey && yKey && (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={yKey} stroke="#610901ff" strokeWidth={2} animationDuration={1000} />
                </LineChart>
              )}

              {type === "pie" && pieNameKey && pieValueKey && (
                <PieChart>
                  <Pie
                    data={data}
                    dataKey={pieValueKey}
                    nameKey={pieNameKey}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="text.secondary">
              No data available
            </Typography>
          </Box>
        )}
      </Paper>
    </Fade>
  );
};

export default ExpenseChart;
