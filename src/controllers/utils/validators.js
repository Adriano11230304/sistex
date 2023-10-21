import * as Yup from 'yup';

let fornecedorSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
});

export async function fornecedorValidate(schema){
    const validate = await fornecedorSchema.validate(schema);
    return validate;
} 



