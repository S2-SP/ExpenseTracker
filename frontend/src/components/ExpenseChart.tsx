import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Box, Typography } from "@mui/material";

interface ExpenseChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data, xKey, yKey, title }) => {
  return (
    <Box width="100%" height={300} mb={5}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpenseChart;
