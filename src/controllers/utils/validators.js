import * as Yup from 'yup';

let fornecedorSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório!"),
    email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
});

export async function fornecedorValidate(schema){
    try{
        const teste = await fornecedorSchema.validate(schema, {abortEarly: true});

        const valid = {
            "validate": teste,
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



