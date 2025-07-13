import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";



const COLORS = ["#f94144", "#577590", "#43aa8b", "#90be6d", "#f9c74f", "#f8961e", "#f3722c"];

  const PieChartSection = ({ chartData, totalExpenses, totalIncomes, isDark, monthId }) => {
  const navigate = useNavigate();

  const totalAll = totalExpenses + totalIncomes;
  const expensesPercentage = totalAll > 0 ? (totalExpenses / totalAll) * 100 : 0;
  const incomesPercentage = totalAll > 0 ? (totalIncomes / totalAll) * 100 : 0;
  
 
  return (
    <>
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="expenseName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ expenseName, percent }) => `${expenseName} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`₪${value}`, "Amount"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Typography variant="customBody" gutterBottom sx={{ mt: 4, color: isDark ? "#F7F9F9" : "#080303" }}>Total Expenses: ₪{totalExpenses}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Box sx={{ width: `${expensesPercentage}%`, height: 10, backgroundColor: "#f44336", borderRadius: 5 }} />
      </Box>

      <Typography variant="customBody" gutterBottom sx={{ mt: 2, color: isDark ? "#F7F9F9" : "#080303" }}>Total Incomes: ₪{totalIncomes}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Box sx={{ width: `${incomesPercentage}%`, height: 10, backgroundColor: "#4caf50", borderRadius: 5 }} />
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid item xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button variant="contained" fullWidth sx={{ backgroundColor: "#4caf50" }} onClick={() => { if (monthId) { navigate(`/create-expense?monthId=${monthId}`);                                                                                                         } else { alert("Month ID missing!");}}}>  
            Edit Expenses
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button variant="contained" fullWidth sx={{ backgroundColor: "#4caf50" }} onClick={() => { if (monthId) { navigate(`/create-income?monthId=${monthId}`);  
                                                                                                       } else { alert("Month ID missing!");}}}>
            Edit Incomes
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button variant="contained" fullWidth sx={{ backgroundColor: "#f9c74f" }} onClick={() => navigate(`/Expense-Details?monthId=${monthId}`)}>
            View Expenses
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button variant="contained" fullWidth sx={{ backgroundColor: "#f9c74f" }} onClick={() => navigate(`/Income-Details?monthId=${monthId}`)}>
            View Incomes
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PieChartSection;
