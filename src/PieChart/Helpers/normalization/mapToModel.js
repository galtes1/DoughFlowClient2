export const mapToExpenseModel = (formValues) => {
  return {
    Shopping: formValues.Shopping,
    Car: formValues.Car,
    Insurances: formValues.Insurances,
    Grocery: formValues.Grocery,
    Rent: formValues.Rent,
    ApartmentBills: formValues.ApartmentBills,
    Savings: formValues.Savings,
    ChildCare: formValues.ChildCare,
    TvServices: formValues.TvServices,
    InternetServices: formValues.InternetServices,
    PhoneServices: formValues.PhoneServices,
    Fun: formValues.Fun,
    Other: formValues.Other,
    month: new Date().toLocaleString("default", { month: "long" }),
  };
};


export const mapToIncomeModel = (formValues) => {
  return {
    FirstSalary: formValues.FirstSalary,
    SecondSalary: formValues.SecondSalary,
    Allowance: formValues.Allowance,
    RentalFees: formValues.RentalFees,
    Other: formValues.Other,
    month: new Date().toLocaleString("default", { month: "long" }),
  };
};



export const mapToPieModel = (formValues) => {
  return {
    expenses: mapToExpenseModel(formValues),
    income: mapToIncomeModel(formValues),
  };
};
