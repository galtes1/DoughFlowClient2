export const normalizeExpenseData = (data) => {
   if (!data || !Array.isArray(data)) {
       console.error("❌ Error: Invalid expenses data structure", data);
     
     return [];
  }

  return data.map((item) => ({
   
    userId: item.userId,
    amount: item.amount,
    expenseCategoryId: item.expenseCategoryId,
    expenseName: item.expenseName,
    date: item.date,
    description: item.description,
    monthId: item.monthId,
  }));
};




export const normalizeIncomeData = (data) => {
  if (!data || !Array.isArray(data)) {
    console.error("❌ Error: Invalid incomes data structure", data);
    return [];
  }

  return data.map((item) => ({
    userId: item.userId,
    amount: item.amount,
    incomeCategoryId: item.incomeCategoryId,
    incomeName: item.incomeName,
    date: item.date,
    description: item.description,
    monthId: item.monthId,
  }));
};


export const normalizePieData = (data) => {
  if (!data || typeof data !== "object") {
    console.error("❌ Error: Invalid pie chart data structure", data);
    return { expenses: [], incomes: [] };
  }
  return {
    expenses: normalizeExpenseData(data.expenses),
    incomes: normalizeIncomeData(data.incomes),
  };
};

