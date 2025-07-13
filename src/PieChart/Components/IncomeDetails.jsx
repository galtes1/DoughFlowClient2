import React, { useEffect, useState } from "react";
import {Container, Typography, Paper, Grid, List,CircularProgress, Box,Button,} from "@mui/material";
import { useUser } from "../../Users/Providers/UserProvider";
import { fetchMonthId, getIncomeData, deleteIncomeData, updateIncomeData } from "../Services/PieApiServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "../../Providers/CustomThemeProvider";
import SingleRecord from "./SingleRecord";
import ConfirmationDialog from "./ConfirmationDialog";



const getCurrentMonthName = () => {
  return new Date().toLocaleString("default", { month: "long" });
};

const IncomeDetails = () => {
  const { user } = useUser();
  const [groupedIncomes, setGroupedIncomes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(0);
  const [editDesc, setEditDesc] = useState(0);
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const selectedMonthId = searchParams.get("monthId");

  const loadIncomes = async () => {
    try {
      let monthId = selectedMonthId;

      if (!monthId) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        monthId = await fetchMonthId(user.UserId, currentMonth, currentYear);
      }

      if (!monthId) return;

      const data = await getIncomeData(user.UserId, monthId);
      const grouped = {};

      data.forEach((income) => {
        const key = income.incomeName;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(income);
      });

      setGroupedIncomes(grouped);
    } catch (err) {
      setError("Failed to load incomes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadIncomes();
  }, [user]);

  const handleDeleteClick = (income) => {
    setSelectedIncome(income);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteIncomeData(selectedIncome.incomeId);
      await loadIncomes();
    } catch (error) {
      console.error("❌ Error deleting income:", error);
    } finally {
      setOpenDialog(false);
      setSelectedIncome(null);
    }
  };

  const handleEditClick = (income) => {
    setSelectedIncome(income);
    setEditAmount(income.amount);
    setEditDesc(income.description);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const updatedIncome = {
        ...selectedIncome,
        amount: parseFloat(editAmount),
        description: editDesc,
      };
      await updateIncomeData(selectedIncome.incomeId, updatedIncome);
      await loadIncomes();
    } catch (error) {
      console.error("❌ Error updating income:", error);
    } finally {
      setEditDialogOpen(false);
      setSelectedIncome(null);
      setEditDesc("");
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedIncome(null);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading incomes...</Typography>
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
  return (
    <Container maxWidth="md" sx={{ mt: 0, p: { xs: 2, sm: 3 }, textAlign: "center" }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom sx={{ color: isDark ? "#F7F9F9" : "#080303", fontFamily: "fantasy" }}>
          Monthly Incomes
        </Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ color: isDark ? "#F7F9F9" : "#080303" }}>
          {getCurrentMonthName()}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {Object.entries(groupedIncomes).map(([category, items]) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: isDark ? "#c0c4ca" : "#f9f9f9", color: isDark ? "#080303" : "inherit" }}>
              <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
                {category}
              </Typography>
              <List>
                {items.map((income, index) => (
                  <SingleRecord
                  key={income.expenseId}
                  id={income.expenseId}
                  amount={income.amount}
                  date={income.date}
                  description={income.description}
                  category={income.expenseName}
                  onEdit={() => handleEditClick(income)}
                  onDelete={() => handleDeleteClick(income)}
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
        <Button variant="custom" onClick={() => navigate(-1)}>Back</Button>
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

export default IncomeDetails;
