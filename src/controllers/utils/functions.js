import FornecedorController from "../FornecedorController";
import CategoriaController from "../CategoriaController";


export async function despTodosDados(despesas) {
    const despesasTotais = [];
    let json;
    for (des of despesas) {
        json = {};
        const forn = await FornecedorController.findById(des.fornecedor_id);
        const categoria = await CategoriaController.findById(des.categoria_id);
        const data = new Date(des.data_entrada).toLocaleString().substring(0, 10);
        let dataPagamento = "";
        if (des.data_pagamento) {
            dataPagamento = new Date(des.data_pagamento).toLocaleString().substring(0, 10);
        } else {
            dataPagamento = "";
        }

        json = {
            "id": des.id,
            "valor": des.valor,
            "categoria_id": des.categoria_id,
            "categoria": categoria.titulo,
            "fornecedor_id": des.fornecedor_id,
            "fornecedor": forn.name,
            "data_entrada": data,
            "data_pagamento": dataPagamento,
            "pago": des.pago,
            "forma_pagamento": des.forma_pagamento,
            "fixa": des.fixa
        }

        despesasTotais.push(json);
    }

    return despesasTotais;
}