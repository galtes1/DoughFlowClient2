import Joi from "joi";

const loginSchema = {
  email: Joi.string()
    .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: "Please enter a valid email" })
    .required(),

  password: Joi.string()
    .ruleset.regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()-]).{9,20}$/
    )
    .rule({
      message:
        'The password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*()-',
    })
    .required(),
};

export default loginSchema;
