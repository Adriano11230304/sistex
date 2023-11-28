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
        let dataVencimento = "";
        if (des.data_vencimento) {
            dataVencimento = new Date(des.data_vencimento).toLocaleString().substring(0, 10);
        } else {
            dataVencimento = "";
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
            "parcelamento": des.parcelamento,
            "data_vencimento": dataVencimento
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
        let dataVencimentoFormatada = des.data_vencimento ? new Date(des.data_vencimento).toLocaleString().substring(0, 10) : null;
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
            "recebida": des.recebida,
            "forma_recebimento": des.forma_recebimento,
            "parcela": des.parcelas,
            "parcelamento": des.parcelamento,
            "data_vencimento": dataVencimentoFormatada
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

export function totalReceitasSeparadas(receitas) {
    let somaTotal = 0;
    let somaRecebidas = 0;
    let somaNaoRecebidas = 0;


    for (des of receitas) {
        somaTotal += des.valor;
        if(des.recebida){
            somaRecebidas += des.valor;
        }else{
            somaNaoRecebidas += des.valor;
        }
    }

    somaTotal = somaTotal.toFixed(2);

    return {
        "somaTotal": somaTotal,
        "somaRecebidas": somaRecebidas.toFixed(2),
        "somaNaoRecebidas": somaNaoRecebidas.toFixed(2)
    }
}

export function totalDespesasSeparadas(despesas) {
    let somaTotal = 0;
    let somaPagas = 0;
    let somaNaoPagas = 0;
    let somaNaoPagasFixas = 0;
    let somaTotalFixas = 0;
    let somaPagasFixas = 0;
    let somaTotalVariaveis = 0;


    for (des of despesas) {
        somaTotal += des.valor;

        if(des.fixa){
            somaTotalFixas += des.valor;
        }else{
            somaTotalVariaveis += des.valor;
        }
        if (des.pago) {
            somaPagas += des.valor;
            if(des.fixa){
                somaPagasFixas += des.valor;
            }
        } else {
            somaNaoPagas += des.valor;
            if (des.fixa) {
                somaNaoPagasFixas += des.valor;
            }
        }
    }

    somaTotal = somaTotal.toFixed(2);

    return {
        "somaTotal": somaTotal,
        "somaPagas": somaPagas.toFixed(2),
        "somaNaoPagas": somaNaoPagas.toFixed(2),
        "somaTotalFixas": somaTotalFixas.toFixed(2),
        "somaNaoPagasFixas": somaNaoPagasFixas.toFixed(2),
        "somaPagasFixas": somaPagasFixas.toFixed(2),
        "somaTotalVariaveis": somaTotalVariaveis.toFixed(2)
    }
}

