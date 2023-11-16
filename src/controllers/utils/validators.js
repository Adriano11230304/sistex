import * as Yup from 'yup';

let fornecedorSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório!"),
    email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
});

export async function fornecedorValidate(schema){
    try{
        const forn = await fornecedorSchema.validate(schema, {abortEarly: true});

        const valid = {
            "validate": forn,
            "isValid": true 
        }
        return valid;
    }catch(e){
        const valid = {
            "validate": e.message,
            "isValid": false
        }
        return valid;
    }
    
}

let categoriaSchema = Yup.object().shape({
    titulo: Yup.string().required("Nome é obrigatório!")
});

export async function categoriaValidate(schema) {
    try {
        const cat = await categoriaSchema.validate(schema, { abortEarly: true });

        const valid = {
            "validate": cat,
            "isValid": true
        }
        return valid;
    } catch (e) {
        const valid = {
            "validate": e.message,
            "isValid": false
        }
        return valid;
    }

} 

let pagarSchema = Yup.object().shape({
    valor: Yup.number().required("Valor é obrigatório!"),
    parcelas: Yup.number().required("Parcelas é obrigatória!"),
    fixa: Yup.boolean("É necessário que seja um booleano!").required("Escolher se a despesa é fixa ou variável é obrigatório!"),
    categoria_id: Yup.number().required("Escolher a categoria é obrigatória!").typeError("Categoria inválida"),
    fornecedor_id: Yup.number().required("Escolher o fornecedor é obrigatório!").typeError("Fornecedor inválido"),
    data_entrada: Yup.number().required("Data de entrada é obrigatória!").typeError("Coloque uma data de entrada válida"),
    pago: Yup.boolean().required("Escolher se a despesa é paga ou não é obrigatória!"),
    forma_pagamento: Yup.string().required("Escolher a forma de pagamento é obrigatória!")
});

export async function pagarValidate(schema) {
    try {
        const despesa = await pagarSchema.validate(schema, { abortEarly: true });

        const valid = {
            "validate": despesa,
            "isValid": true
        }
        return valid;
    } catch (e) {
        const valid = {
            "validate": e.message,
            "isValid": false
        }
        return valid;
    }

} 