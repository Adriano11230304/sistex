import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.min": "O nome deve ter pelo menos 3 caracteres",
        "string.max": "O nome deve ter no máximo 20 caracteres",
        "string.empty": "Nome não informado"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email não informado",
        "email": "Email inválido"
    }),
    /*cpf: Joi.string().required().min(11).max(11).pattern(new RegExp('[0-9]{11}')).messages({
        "string.empty": "CPF não informado",
        "string.max": "O CPF deve ter 11 caracteres",
        "string.min": "O CPF deve ter 11 caracteres",
        "string.pattern.base": "CPF inválido"
    })*/
});

export const validateFornecedor = (fornecedor) => {
    const result = schema.validate(fornecedor, {
        abortEarly: false
    });
    if (result.error) {
        return result.error;
    }
}

