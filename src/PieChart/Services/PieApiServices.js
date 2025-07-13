import axios from "axios";

const monthApiUrl = "https://localhost:7267/api/months";
const apiUrl = "https://localhost:7267/api";


export const getPieDataByMonth = async (month, userId) => {
  if (!userId) {
    console.error("❌ Error: No userId provided.");
    return;
  }
  const monthNumber = typeof month === "string" ? parseInt(month) : month;
  try {
    const response = await axios.get(`${monthApiUrl}/pie-data?userId=${userId}&monthid=${monthNumber}`);
    return response.data;
    
  } catch (error) {
    console.error("❌ Error fetching pie data:", error);
    throw error;
  }
}; 


export const fetchMonthId = async (userId, monthNumber, year) => {
  try {
    const response = await fetch(`${monthApiUrl}/get-month-id?userId=${userId}&month=${monthNumber}&year=${year}`);
    if (!response.ok) {
      console.error("❌ API Error:", response.status, response.statusText);
      return null;
    }
    const data = await response.json();
    return data.monthId;
  } catch (error) {
    console.error("❌ Error fetching monthId:", error);
    return null;
  }
};



export const addExpenseData = async (expenseData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/expenses/Create`, expenseData); 
    return data;
  } catch (error) {
    console.error("❌ Error saving expense:", error);
    return handleAxiosError(error);
  }
};


export const addIncomeData = async (incomeData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/income/Create`, incomeData); 
    return data;
  } catch (error) {
    console.error("❌ Error saving INCOMES:", error);
    return handleAxiosError(error);
  }
};


export const updateExpenseData = async (expenseId, updatedExpenseData) => {
  try {
    const { data } = await axios.put(`${apiUrl}/expenses/${expenseId}`, updatedExpenseData);
    return data;
  } catch (error) {
    console.error("❌ Error updating expense:", error);
    return Promise.reject(error.message);
  }
};


export const updateIncomeData = async (incomeId, updatedIncomeData) => {
  try {
    const { data } = await axios.put(`${apiUrl}/income/${incomeId}`, updatedIncomeData);
    return data;
  } catch (error) {
    console.error("❌ Error updating income:", error);
    return Promise.reject(error.message);
  }
};

export const getIncomeData = async (userId, monthId) => {
  try {
    const response = await axios.get(`${apiUrl}/income`, {
      params: {
        userId,
        monthId
      }
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching income data:", error);
    return handleAxiosError(error);
  }
};

export const getExpenseData = async (userId, monthId) => {
  try {
    const response = await axios.get(`${apiUrl}/expenses`, {
      params: {
        userId,
        monthId
      }
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching expenses data:", error);
    return handleAxiosError(error);
  }
};



export const deleteIncomeData = async (incomeId) => {
  try {
    await axios.delete(`${apiUrl}/income/${incomeId}`);
  } catch (error) {
    console.error("❌ Error deleting income:", error);
    throw error;
  }
};

export const deleteExpenseData = async (expenseId) => {
  try {
    await axios.delete(`${apiUrl}/expenses/${expenseId}`);
  } catch (error) {
    console.error("❌ Error deleting expense:", error);
    throw error;
  }
};


const handleAxiosError = (error) => {
  if (error.response) {
    console.error("❌ Error response data:", error.response.data);
    console.error("Error response status:", error.response.status);
    console.error("Error response headers:", error.response.headers);
  } else if (error.request) {
    console.error("❌ No response received for the request:", error.request);
  } else {
    console.error("❌ Error setting up the request:", error.message);
  }
  return Promise.reject(error.message);
};
