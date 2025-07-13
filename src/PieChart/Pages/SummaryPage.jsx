import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box,Typography,Button,Container,Grid,CircularProgress,Avatar,Paper,} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import usePieChart from "../Hooks/usePieChart";
import { useUser } from "../../Users/Providers/UserProvider";
import { fetchMonthId } from "../Services/PieApiServices";
import { useTheme } from "../../Providers/CustomThemeProvider";
import useGptAnalysis from "../Services/useGptAnalysis";

const COLORS = ["#f94144", "#577590", "#43aa8b", "#90be6d", "#f9c74f", "#f8961e", "#f3722c"];

const getCurrentMonth = () => {
  return new Date().toLocaleString("default", { month: "long" });
};

const SummaryPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { pieData, isLoading, error, getPieData, chartExpenses } = usePieChart();
  const [noData, setNoData] = useState(false);
  const { isDark } = useTheme();
  const [monthId, setMonthId] = useState(null);
  const { askGpt, gptLoading, gptResponse } = useGptAnalysis();
  const [showBubble, setShowBubble] = useState(false);

  const totalExpenses = pieData.expenses?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalIncomes = pieData.incomes?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalAll = totalExpenses + totalIncomes;
  const expensesPercentage = totalAll > 0 ? (totalExpenses / totalAll) * 100 : 0;
  const incomesPercentage = totalAll > 0 ? (totalIncomes / totalAll) * 100 : 0;


  useEffect(() => {
    if (user) {
      const getPieDataForUser = async () => {
        const currentMonthNumber = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const fetchedMonthId = await fetchMonthId(user.UserId, currentMonthNumber, currentYear);
        if (!fetchedMonthId) return;
        setMonthId(fetchedMonthId);
        getPieData(fetchedMonthId, user.UserId).catch(console.error);
      };

      getPieDataForUser();
    }
  }, [user]);

  useEffect(() => {
    if (pieData && Object.keys(pieData).length > 0) {
      setNoData(false);
    } else {
      setNoData(true);
    }
  }, [pieData]);
  useEffect(() => {
    const handleClickOutside = () => {
      if (showBubble) {
        setShowBubble(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showBubble]);
  

  const handleGptClick = async (e) => {
    e.stopPropagation();
    if (!user) return;
    await askGpt(user.UserId);
    setShowBubble(true);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading data...</Typography>
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  if (noData) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <Typography sx={{ color: isDark ? "#F7F9F9" : "#080303" }} variant="h4" fontWeight="bold" gutterBottom>
          {getCurrentMonth()}
        </Typography>
        <Typography color="error">No data available for this month.</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/create-expense")}>My Expenses</Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/create-income")}>My Incomes</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <Typography sx={{ color: isDark ? "#F7F9F9" : "#080303" }} variant="h4" fontWeight="bold" gutterBottom>
        {getCurrentMonth()}
      </Typography>

      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartExpenses}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartExpenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`₪${value}`, "Amount"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4, color: isDark ? "#F7F9F9" : "#080303" }}>Total Expenses: ₪{totalExpenses}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Box sx={{ width: `${expensesPercentage}%`, height: 10, backgroundColor: "#f44336", borderRadius: 5 }} />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 2, color: isDark ? "#F7F9F9" : "#080303" }}>Total Incomes: ₪{totalIncomes}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Box sx={{ width: `${incomesPercentage}%`, height: 10, backgroundColor: "#4caf50", borderRadius: 5 }} />
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button sx={{ backgroundColor: "#4caf50" }} variant="contained" fullWidth onClick={() => navigate(`/create-expense?monthId=${monthId}`)}>
            Add Expenses
          </Button>
        </Grid>
        <Grid xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button sx={{ backgroundColor: "#4caf50" }} variant="contained" fullWidth onClick={() => navigate(`/create-income?monthId=${monthId}`)}>
            Add Incomes
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button sx={{ backgroundColor: "#f9c74f" }} variant="contained" fullWidth onClick={() => navigate("/Expense-Details")}>
            Monthly Expenses view
          </Button>
        </Grid>
        <Grid xs={12} sm={4} sx={{ mr: 3, m: 1 }}>
          <Button sx={{ backgroundColor: "#f9c74f" }} variant="contained" fullWidth onClick={() => navigate("/Income-Details")}>
            Monthly Incomes view
          </Button>
        </Grid>
      </Grid>
      {user?.IsBusiness?.toLowerCase?.() === "true" && (    
      <Box sx={{
        position: "fixed",
        right: { xs: 10, sm: 40 }, 
        top: { xs: 20, sm: 300 },  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 9999,
      }}>
        <Button onClick={handleGptClick} sx={{ borderRadius: "50%", p: 1, backgroundColor: "#f9f4f3" }}>
          <Avatar src={`${process.env.PUBLIC_URL}/avatars/robotImage.png`} alt="Ask GPT"  sx={{ width: { xs: 60, sm: 90 }, height: { xs: 60, sm: 90 } }} />
        </Button>
        <Typography variant="customBody" fontWeight="bold" sx={{ mt: 1 }}>Ask Me</Typography>

        {showBubble && (
          <Paper variant="gptBubble" elevation={6}  >
            {gptLoading ? <Typography>Thinking...</Typography> : <Typography>{gptResponse}</Typography>}
          </Paper>
        )}
      </Box>)}
    </Container>
  );
};

export default SummaryPage;
