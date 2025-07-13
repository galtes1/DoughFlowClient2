import { useCallback,  useMemo, useState } from "react";
import { useSnack } from "../../Providers/SnackbarProvider";
import { normalizePieData } from "../Helpers/normalization/normalizePieForm";
import { getPieDataByMonth, addIncomeData, addExpenseData } from "../Services/PieApiServices";
import { useUser } from "../../Users/Providers/UserProvider"; 

export default function usePieChart() {
  const { user } = useUser(); 
  const [pieData, setPieData] = useState({
    expenses: [],
    incomes: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const setSnack = useSnack();

  // איחוד רשומות לפי שם קטגוריה
  const chartExpenses = Object.values(
    pieData.expenses.reduce((acc, item) => {
      const key = item.expenseName;
      if (!acc[key]) {
        acc[key] = { ...item, name: key };
      } else {
        acc[key].amount += item.amount;
      }
      return acc;
    }, {})
  );

  const addExpenses = useCallback(async (expensesData) => {
    try {
      const savedExpenses = await addExpenseData(expensesData);
      setPieData((prev) => ({
        ...prev,
        expenses: [...(prev.expenses ?? []), savedExpenses],
      }));
    } catch (error) {
      console.error("❌ Failed to add expenses:", error);
    }
  }, []);

  const addIncome = useCallback(async (incomesData) => {
    try {
      const savedIncomes = await addIncomeData(incomesData);
      setPieData((prev) => ({
        ...prev,
        incomes: [...(prev.incomes ?? []), savedIncomes],
      }));
    } catch (error) {
      console.error("❌ Failed to add income:", error);
    }
  }, []);

  const getPieData = useCallback(async (month) => {
    const hebrewMonths = {
      "ינואר": 1, "פברואר": 2, "מרץ": 3, "אפריל": 4, "מאי": 5, "יוני": 6,
      "יולי": 7, "אוגוסט": 8, "ספטמבר": 9, "אוקטובר": 10, "נובמבר": 11, "דצמבר": 12
    };
    const monthNumber = typeof month === "string" ? (hebrewMonths[month] ?? parseInt(month)) : month;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getPieDataByMonth(monthNumber, user.UserId);
      if (!data || typeof data !== "object") {
        throw new Error("❌ Invalid data received from server.");
      }
      setPieData(normalizePieData(data));
      setSnack("success", "Pie chart data loaded successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user, setSnack]);

  const value = useMemo(() => {
    return {
      isLoading,
      pieData: {
        expenses: Array.isArray(pieData.expenses) ? pieData.expenses : [],
        income: Array.isArray(pieData.incomes) ? pieData.incomes : [],
      },
      error,
      addIncome,
    };
  }, [isLoading, pieData, error]);

  return {
    pieData,
    value,
    isLoading,
    error,
    getPieData,
    addIncome,
    addExpenses,
    chartExpenses,
  };
}
