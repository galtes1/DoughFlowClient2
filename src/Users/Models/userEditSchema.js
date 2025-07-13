import Joi from "joi";

const userEditSchema = {
    name: Joi.string().min(2).max(256).required(),
    email: Joi.string()
       .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
       .rule({ message: "Please enter a valid email" })
       .required(),
   
    password: Joi.string()
    .allow("")
       .ruleset.regex(
         /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()-]).{9,20}$/
       )
       .rule({
         message:
           'The password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*()-',
       })
       .required(),

    isBusiness: Joi.boolean().required(),
    userId: Joi.number(),
    currentPassword: Joi.string().allow("").optional(),
};

export default userEditSchema;