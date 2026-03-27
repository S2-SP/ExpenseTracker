import React from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Box, Typography, Paper, Fade, useMediaQuery, useTheme } from "@mui/material";

interface ExpenseChartProps {
  data: any[];
  xKey?: string;
  yKey?: string;
  title: string;
  type: "bar" | "line" | "pie";
  pieNameKey?: string;
  pieValueKey?: string;
}

const COLORS = ["#1976d2", "#ff9800", "#4caf50", "#e91e63", "#9c27b0", "#00bcd4"];

const ExpenseChart: React.FC<ExpenseChartProps> = ({
  data, xKey, yKey, title, type, pieNameKey, pieValueKey
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const chartHeight = isMobile ? 240 : 300;
  const hasData = data && data.length > 0;

  return (
    <Fade in timeout={600}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          height: chartHeight + 60,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          {title}
        </Typography>

        {hasData ? (
          <Box flex={1}>
            <ResponsiveContainer width="100%" height="100%">
              {type === "bar" && xKey && yKey ? (
                <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey={xKey} tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={50} />
                  <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`, "Total"]} />
                  <Legend />
                  <Bar dataKey={yKey} fill="#1976d2" radius={[4, 4, 0, 0]} animationDuration={800} />
                </BarChart>
              ) : type === "line" && xKey && yKey ? (
                <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey={xKey} tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={50} />
                  <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`, "Total"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={yKey}
                    stroke="#1976d2"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1000}
                  />
                </LineChart>
              ) : type === "pie" && pieNameKey && pieValueKey ? (
                <PieChart>
                  <Pie
                    data={data}
                    dataKey={pieValueKey}
                    nameKey={pieNameKey}
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 70 : 100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={!isMobile}
                  >
                    {data.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`]} />
                  <Legend />
                </PieChart>
              ) : <></>}
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            <Typography color="text.secondary" variant="body2">No data available</Typography>
          </Box>
        )}
      </Paper>
    </Fade>
  );
};

export default ExpenseChart;
