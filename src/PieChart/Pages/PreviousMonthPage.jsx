import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, MenuItem, Select } from "@mui/material";
import { useUser } from "../../Users/Providers/UserProvider";
import { fetchMonthId, getPieDataByMonth } from "../Services/PieApiServices";
import { useTheme } from "../../Providers/CustomThemeProvider";
import PieChartSection from "./PieChartSection";

const PreviousMonthPage = () => {
  const { user } = useUser();
  const { isDark } = useTheme();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pieData, setPieData] = useState(null);
  const [monthId, setMonthId] = useState(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const fetchedMonthId = await fetchMonthId(user.UserId, selectedMonth, selectedYear);
        setMonthId(fetchedMonthId); 
        if (fetchedMonthId) {
          const data = await getPieDataByMonth(fetchedMonthId, user.UserId);
          setPieData(data);
        } else {
          setPieData(null);
        }

        setLoading(false);
      };
      fetchData();
    }
  }, [user, selectedMonth, selectedYear]);

  const totalExpenses = pieData?.expenses?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;
  const totalIncomes = pieData?.incomes?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) || 0;

  const chartData = [...(pieData?.expenses || [])];

  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" align="center" sx={{ color: isDark ? "#F7F9F9" : "#080303", fontFamily: "fantasy" }}>
        Monthly Summary View
      </Typography>

      <Select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} sx={{ mt: 3, mr: 2 }}>
        {[...Array(12).keys()].map((m) => (
          <MenuItem key={m + 1} value={m + 1}>
            {new Date(0, m).toLocaleString("default", { month: "long" })}
          </MenuItem>
        ))}
      </Select>

      <Select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} sx={{ mt: 3 }}>
        {[2023, 2024, 2025].map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      {loading || !monthId? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : pieData ? (
        <PieChartSection
          chartData={chartData}
          totalExpenses={totalExpenses}
          totalIncomes={totalIncomes}
          isDark={isDark}
          monthId={monthId} 
          buttonType="current"
        />
      ) : (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          No data for this month
        </Typography>
      )}
    </Container>
  );
};

export default PreviousMonthPage;
