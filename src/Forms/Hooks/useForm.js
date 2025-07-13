import { useCallback, useState, useEffect } from "react";
import Joi from "joi";
import { useSnack } from "../../Providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { normalizeExpenseData, normalizeIncomeData } from "../../PieChart/Helpers/normalization/normalizePieForm";
import { addExpenseData, addIncomeData, getIncomeData, getExpenseData } from "../../PieChart/Services/PieApiServices";

export default function useForm(initialExpenseForm, schema, handleSubmit, userId, monthId) {
  const [data, setData] = useState(initialExpenseForm);
  const [errors, setErrors] = useState({});
  const setSnack = useSnack();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState(null);
  const [incomes, setIncomes] = useState(null);

  const validateProperty = useCallback(
    (name, value) => {
      const obj = { [name]: value };
      const generateSchema = Joi.object({ [name]: schema[name] });
      const { error } = generateSchema.validate(obj);
      return error ? error.details[0].message : null;
    },
    [schema]
  );

  const handleCreateExpenses = useCallback(
    async (ExpensesFromClient) => {
      setErrors(null);
      setIsLoading(true);
      try {
        const expense = await addExpenseData(normalizeExpenseData(ExpensesFromClient));
        setExpenses(expense);
        setSnack("success", "A new expense has been created");
      } catch (error) {
        setErrors(error.message);
      }
      setIsLoading(false);
    },
    [setSnack, navigate]
  );

  const handleCreateIncome = useCallback(
    async (IncomeFromClient) => {
      setErrors(null);
      setIsLoading(true);
      try {
        const Income = await addIncomeData(normalizeIncomeData(IncomeFromClient));
        setIncomes(Income);
        setSnack("success", "A new Income has been created");
      } catch (error) {
        setErrors(error.message);
      }
      setIsLoading(false);
    },
    [setSnack, navigate]
  );

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
      const errorMessage = validateProperty(name, value);
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });
      }
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [validateProperty]
  );

  const handleChangeCheckBox = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.checked;
      const errorMessage = validateProperty(name, value);
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setErrors((prev) => {
          let obj = { ...prev };
          delete obj[name];
          return obj;
        });
      }
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [validateProperty]
  );

  const handleReset = useCallback(() => {
    setData(initialExpenseForm);
    setErrors({});
  }, [initialExpenseForm]);


  const validateForm = useCallback(() => {
    const schemaForValidate = Joi.object(schema);
    const { error } = schemaForValidate.validate(data);
    if (error) 
    {
      return false;
    }
    return true;
  }, [data, schema]);


  const onSubmit = useCallback(() => {
    handleSubmit(data);
  }, [handleSubmit, data]);

  useEffect(() => {
    const fetchExistingIncomes = async () => {
      if (!monthId) return;
      try {
        const existingIncomes = await getIncomeData(userId, monthId);
        setIncomes(existingIncomes);
      } catch (err) {
        console.error("❌ Failed to fetch existing incomes:", err);
        setErrors(err.message);
      }
    };

    fetchExistingIncomes();
  }, [userId, monthId]);


  useEffect(() => {
    const fetchExistingExpenses = async () => {
      if (!monthId) return;

      try {
        const existingExpenses = await getExpenseData(userId, monthId);
        setExpenses(existingExpenses);
      } catch (err) {
        console.error("❌ Failed to fetch existing Expenses:", err);
        setErrors(err.message);
      }
    };

    fetchExistingExpenses();
  }, [userId, monthId]);


  return {
    data,
    errors,
    setData,
    handleChange,
    handleReset,
    handleCreateExpenses,
    handleCreateIncome,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
    incomes,
    expenses
  };
}
