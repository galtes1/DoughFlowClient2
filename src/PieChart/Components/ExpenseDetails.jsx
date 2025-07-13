import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, List,CircularProgress, Box, Button} from "@mui/material";
import { useUser } from "../../Users/Providers/UserProvider";
import { fetchMonthId, getExpenseData, deleteExpenseData, updateExpenseData } from "../Services/PieApiServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "../../Providers/CustomThemeProvider";
import SingleRecord from "./SingleRecord";
import ConfirmationDialog from "./ConfirmationDialog";

const getCurrentMonthName = () => {
  return new Date().toLocaleString("default", { month: "long" });
};

const ExpenseDetails = () => {
  const { user } = useUser();
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(0);
  const [editDesc, setEditDesc] = useState(0);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const selectedMonthId = searchParams.get("monthId");

  const loadExpenses = async () => {
    try {
      let monthId = selectedMonthId;

      if (!monthId) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        monthId = await fetchMonthId(user.UserId, currentMonth, currentYear);
      }

      if (!monthId) return;

      const data = await getExpenseData(user.UserId, monthId);
      const grouped = {};
      data.forEach((expense) => {
      const key = expense.expenseName;
      if (!grouped[key]) grouped[key] = [];
        grouped[key].push(expense);
      });
      setGroupedExpenses(grouped);
    } catch (err) {
      if (err.response?.status === 404) {
        setGroupedExpenses({});
      } else {
        console.error("❌ Error fetching expenses:", err);
        setError("Failed to load expenses");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadExpenses();
  }, [user]);

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteExpenseData(selectedExpense.expenseId);
      await loadExpenses();
    } catch (error) {
      console.error("❌ Error deleting expense:", error);
    } finally {
      setOpenDialog(false);
      setSelectedExpense(null);
    }
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setEditAmount(expense.amount);
    setEditDesc(expense.description);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const updatedExpense = {
        ...selectedExpense,
        amount: parseFloat(editAmount),
        description: editDesc,
      };
      await updateExpenseData(selectedExpense.expenseId, updatedExpense);
      await loadExpenses();
    } catch (error) {
      console.error("❌ Error updating expense:", error);
    } finally {
      setEditDialogOpen(false);
      setSelectedExpense(null);
      setEditDesc("");
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedExpense(null);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading expenses...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom sx={{ color: isDark ? "#F7F9F9" : "#080303", fontFamily: "fantasy" }}>
          Monthly Expenses
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight="bold" sx={{ color: isDark ? "#F7F9F9" : "#080303" }}>
          {getCurrentMonthName()}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {Object.entries(groupedExpenses).map(([category, items]) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: isDark ? "#c0c4ca" : "#f9f9f9", color: isDark ? "#080303" : "inherit" }}>
              <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
                {category}
              </Typography>
              <List>
                  {items.map((expense, index) => (
                    <SingleRecord
                      key={expense.expenseId}
                      id={expense.expenseId}
                      amount={expense.amount}
                      date={expense.date}
                      description={expense.description}
                      category={expense.expenseName}
                      onEdit={() => handleEditClick(expense)}
                      onDelete={() => handleDeleteClick(expense)}
                      isDark={isDark}
                      showDivider={index < items.length - 1}
                    />
                  ))}
                </List>                
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid xs={12} sm={5} sx={{ mt: 3 }}>
        <Button  variant="custom"  onClick={() => navigate(-1)}>Back</Button>
      </Grid>
      <ConfirmationDialog
          open={openDialog}
          type="delete"
          title="Deletion confirmation"
          message="Are you sure you want to delete the record?"
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
      />

      <ConfirmationDialog
        open={editDialogOpen}
        type="edit"
        title="Edit"
        onClose={() => setEditDialogOpen(false)}
        onConfirm={handleEditSave}
        editValues={{ amount: editAmount, description: editDesc }}
        onEditChange={(field, value) => {
          if (field === "amount") setEditAmount(value);
          if (field === "description") setEditDesc(value);
        }}
      />
    </Container>
  );
};

export default ExpenseDetails;
