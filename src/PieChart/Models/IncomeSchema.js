import Joi from "joi";
const Joi = require('joi');

const incomeSchema = Joi.object({
  RentalIncome: Joi.number().integer().optional(),
  Salary: Joi.number().integer().optional(),
  SecondSalary: Joi.number().integer().optional(),
  Allowance: Joi.number().integer().optional(),
  Other: Joi.number().integer().optional(),
  month: Joi.string().valid(new Date().toLocaleString('default', { month: 'long' })).required() 
});

module.exports = incomeSchema;
