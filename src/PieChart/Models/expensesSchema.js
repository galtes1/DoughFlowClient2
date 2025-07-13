import Joi from "joi";

const expensesSchema = Joi.object({
  UserId: Joi.number().integer().required(), 
  
  Shopping: Joi.number().integer().min(0).optional(),
  Car: Joi.number().integer().min(0).optional(),
  Insurances: Joi.number().integer().min(0).optional(),
  Grocery: Joi.number().integer().min(0).optional(),
  Rent: Joi.number().integer().min(0).optional(),
  ApartmentBills: Joi.number().integer().min(0).optional(),
  Savings: Joi.number().integer().min(0).optional(),
  ChildCare: Joi.number().integer().min(0).optional(),
  TvServices: Joi.number().integer().min(0).optional(),
  InternetServices: Joi.number().integer().min(0).optional(),
  PhoneServices: Joi.number().integer().min(0).optional(),
  Fun: Joi.number().integer().min(0).optional(),
  Other: Joi.number().integer().min(0).optional(),

  month: Joi.string()
    .valid(
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    )
    .required()
});

export default expensesSchema;
