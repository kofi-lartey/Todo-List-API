import Joi from "joi";

export const todoListSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    completion:Joi.boolean().optional(),
    dueDate:Joi.date().optional(),
    user: Joi.string()
});