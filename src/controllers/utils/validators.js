import * as Yup from 'yup';

let fornecedorSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

export async function fornecedorValidate(schema){
    try{
        const teste = await fornecedorSchema.validate(schema, {abortEarly: false});

        const valid = {
            "validate": teste,
            "isValid": true 
        }
    }catch(e){
        const errors = [];
        e.inner.forEach(element => {
            errors.push(element.message);
        });
        const valid = {
            "validate": errors,
            "isValid": false
        }
        return valid;
    }
    
} 



