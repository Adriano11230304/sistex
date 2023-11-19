import FornecedorController from "../FornecedorController";
import CategoriaController from "../CategoriaController";
import ClienteController from "../ClienteController";


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
            "fixa": des.fixa,
            "parcela": des.parcelas,
            "parcelamento": des.parcelamento
        }

        despesasTotais.push(json);
    }

    return despesasTotais;
}

export function somatorioDespesas(despesas){
    let somaTotal = 0;

    for(des of despesas){
        somaTotal += des.valor;
    }

    somaTotal = somaTotal.toFixed(2);

    return somaTotal;
}

export async function receitasTodosDados(receitas) {
    const receitasTotais = [];
    let json;
    for (des of receitas) {
        json = {};
        const cliente = await ClienteController.findById(des.cliente_id);
        const data = new Date(des.data_entrada).toLocaleString().substring(0, 10);
        let dataRecebimento = "";
        if (des.data_recebimento) {
            dataRecebimento = new Date(des.data_recebimento).toLocaleString().substring(0, 10);
        } else {
            dataRecebimento = "";
        }

        json = {
            "id": des.id,
            "valor": des.valor,
            "cliente_id": des.cliente_id,
            "cliente": cliente.name,
            "data_entrada": data,
            "data_recebimento": dataRecebimento,
            "recebido": des.recebido,
            "forma_recebimento": des.forma_recebimento,
            "parcela": des.parcelas,
            "parcelamento": des.parcelamento
        }

        receitasTotais.push(json);
    }

    return receitasTotais;
}

export function somatorioReceitas(receitas) {
    let somaTotal = 0;

    for (des of receitas) {
        somaTotal += des.valor;
    }

    somaTotal = somaTotal.toFixed(2);

    return somaTotal;
}

