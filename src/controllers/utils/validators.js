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



