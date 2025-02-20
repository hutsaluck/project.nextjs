import Joi from "joi";

export const LoginValidator = Joi.object({
    username: Joi.string()
        .pattern(new RegExp('^[a-zA-Zа-яА-яёЁіІїЇєЄҐґ]{1,20}$'))
        .max(20)
        .min(1)
        .required()
        .label('Name')
        .messages({'string.pattern.base': `Your name value didn't match pattern`}),
    password: Joi.string()
        .max(20)
        .min(1)
        .required()
        .label('Password')
        .messages({'string.pattern.base': `Your name value didn't match pattern`}),
})