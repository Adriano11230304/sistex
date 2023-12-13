import FornecedorController from "../FornecedorController";
import CategoriaController from "../CategoriaController";
import ClienteController from "../ClienteController";
import * as Notify from "expo-notifications";
import PagarController from "../PagarController";
import ReceberController from "../ReceberController";
import NotificacaoController from "../NotificacaoController";
import { useAuth } from '../../store/auth';


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

export async function notificationLocal() {
    const date = Date.now();
    const despesas = await PagarController.despesasVencidas(date);
    let mensagem = "Existem despesas que estão vencidas, verifique-as!";
    const dia = parseInt(new Date(date).toLocaleString().substring(0, 2)) - 5;
    const ano = new Date(date).toLocaleString().substring(6, 10);
    const mes = new Date(date).toLocaleString().substring(3, 5);
    const datefim = new Date(ano + "-" + mes + "-" + dia + "T00:00:00").getTime();
    const not = await NotificacaoController.listAllDate(datefim);
    let despesastrue = false;
    for(let noti of not){
        if(noti.type == 'despesas' && !despesastrue){
            despesastrue = true;
        }
    }

    if(despesas.length > 0 && !despesastrue){
        const add = await NotificacaoController.add(mensagem, "despesas");
        await Notify.scheduleNotificationAsync({
            content: {
                title: 'Notificação local',
                body: mensagem,
                data: [],
            },
            trigger: {
                seconds: 1,
            },
        });
    }
    
};


export async function notificationLocalReceitas() {
    const date = Date.now();
    const despesas = await PagarController.despesasVencidas(date);
    let mensagem = "Existem receitas que estão vencidas, verifique-as!";
    const dia = parseInt(new Date(date).toLocaleString().substring(0, 2)) - 5;
    const ano = new Date(date).toLocaleString().substring(6, 10);
    const mes = new Date(date).toLocaleString().substring(3, 5);
    const datefim = new Date(ano + "-" + mes + "-" + dia + "T00:00:00").getTime();
    const not = await NotificacaoController.listAllDate(datefim);

    let receitastrue = false;
    for (let noti of not) {
        if(noti.type == 'receitas' && !receitastrue){
            receitastrue = true;
        }
    }

    if (despesas.length > 0 && !receitastrue) {
        const add = await NotificacaoController.add(mensagem, "receitas");
        await Notify.scheduleNotificationAsync({
            content: {
                title: 'Notificação local',
                body: mensagem,
                data: [],
            },
            trigger: {
                seconds: 1,
            },
        });
    }

};

export async function atualizarHome(selected, dispatch){
    const datainicioHome = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
    const datafimHome = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-31T00:00:00").getTime();
    const despesastot = await PagarController.listAllNoPage(datainicioHome, datafimHome);
    const totDespesasAll = totalDespesasSeparadas(despesastot);
    const totReceitas = totalReceitasSeparadas(await ReceberController.listAllNoPage(datainicioHome, datafimHome));
    const bal = (totReceitas.somaTotal - totDespesasAll.somaTotal);
    dispatch({ "type": "balanco", "balanco": bal.toFixed(2) });
    const sal = (totReceitas.somaRecebidas - totDespesasAll.somaPagas);
    dispatch({ "type": "saldo", "saldo": sal.toFixed(2) });
    dispatch({
        "type": "valorTotalDespesasNoPage",
        "valorTotalDespesasNoPage": totDespesasAll
    })
    dispatch({
        "type": "valorTotalReceitasNoPage",
        "valorTotalReceitasNoPage": totReceitas
    })
}

export async function atualizarValoresDespesas(page, selectedDespesas, dispatch, pagas, naoPagas){
    const datainicio = new Date(selectedDespesas.substring(3, 8) + "-" + selectedDespesas.substring(0, 2) + "-01T00:00:00").getTime();
    const datafim = new Date(selectedDespesas.substring(3, 8) + "-" + selectedDespesas.substring(0, 2) + "-31T00:00:00").getTime();
    const despesasFixas = await PagarController.listAllFixas(1, datainicio, datafim, pagas, naoPagas);
    const despesasVariaveis = await PagarController.listAllVariaveis(1, datainicio, datafim, pagas, naoPagas);
    const despesas = await PagarController.listAll(page, datainicio, datafim, pagas, naoPagas);
    const action = {
        "type": "atualizarDespesas",
        "despesas": await despTodosDados(despesas),
        "valorTotal": somatorioDespesas(despesas)
    }
    dispatch(action);
    const actionVariaveis = {
        "type": "atualizarDespesasVariaveis",
        "despesasVariaveis": await despTodosDados(despesasVariaveis),
        "valorTotalVariaveis": somatorioDespesas(despesasVariaveis)
    }
    dispatch(actionVariaveis);
    const actionFixas = {
        "type": "atualizarDespesasFixas",
        "despesasFixas": await despTodosDados(despesasFixas),
        "valorTotalFixas": somatorioDespesas(despesasFixas)
    }
    dispatch(actionFixas);
}

export async function atualizarValoresDespesasFind(selectedDespesas, dispatch, searchText){
    const datainicio = new Date(selectedDespesas.substring(3, 8) + "-" + selectedDespesas.substring(0, 2) + "-01T00:00:00").getTime();
    let mesfim = 1 + parseInt(selectedDespesas.substring(0, 2));
    const datafim = new Date(selectedDespesas.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
    let newList = null;
    newList = await PagarController.findFornecedororCategoria(searchText, datainicio, datafim, 50);
    const despesasTotais = await despTodosDados(newList);
    const action = {
        "type": "atualizarDespesas",
        "despesas": despesasTotais,
        "valorTotal": somatorioDespesas(newList)
    }

    dispatch(action);
}

export async function atualizarValoresReceitas(page, selectedReceitas, dispatch, recebidas, naoRecebidas){
    let mesfim = 1 + parseInt(selectedReceitas.substring(0, 2));
    const datainicio = new Date(selectedReceitas.substring(3, 8) + "-" + selectedReceitas.substring(0, 2) + "-01T00:00:00").getTime();
    const datafim = new Date(selectedReceitas.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
    const receitas = await ReceberController.listAll(page, datainicio, datafim, recebidas, naoRecebidas);
    dispatch({
        "type": "atualizarReceitas",
        "receitas": await receitasTodosDados(receitas),
        "valorTotalReceitas": somatorioReceitas(receitas)
    })
}

export async function atualizarValoresReceitasFind(selectedReceitas, dispatch, searchText){
    const datainicio = new Date(selectedReceitas.substring(3, 8) + "-" + selectedReceitas.substring(0, 2) + "-01T00:00:00").getTime();
    let mesfim = 1 + parseInt(selectedReceitas.substring(0, 2));
    const datafim = new Date(selectedReceitas.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
    let newList = null;
    newList = await ReceberController.findClientesorForma(searchText, datainicio, datafim, 50);
    const receitasTotais = await receitasTodosDados(newList);
    const action = {
        "type": "atualizarReceitas",
        "receitas": receitasTotais,
        "valorTotalReceitas": somatorioReceitas(newList)
    }

    dispatch(action);
}

