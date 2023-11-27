import Pagar from '../models/Pagar';

class PagarController{
    async listAll(page, datainicio, datafim, pagas = false, naoPagas = false){
        const contas = Pagar.findAll(page, datainicio, datafim, pagas, naoPagas);
        return contas;
    }

    async listAllAll(){
        const contas = Pagar.findAllAll();
        return contas;
    }

    async listAllFixas(page, datainicio, datafim, pagas = false, naoPagas = false) {
        const contas = Pagar.findAllFixas(page, datainicio, datafim, pagas, naoPagas);
        return contas;
    }

    async listAllVariaveis(page, datainicio, datafim, pagas = false, naoPagas = false) {
        const contas = Pagar.findAllVariaveis(page, datainicio, datafim, pagas, naoPagas);
        return contas;
    }

    async add(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, parcelamento, data_vencimento){
        const conta = new Pagar(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, parcelamento, data_vencimento);
        try {
            await conta.create();
            return "Conta adicionado com sucesso!";
        } catch (err) {
            return err;
        }

    }

    async findById(id) {
        const conta = await Pagar.findById(id);
        if (conta.length > 0) {
            return conta[0];
        } else {
            return "despesa com esse id não encontrado!";
        }
    }

    async remove(id) {
        const pagardeleted = await Pagar.delete(id)
        if (pagardeleted == 1) {
            return "Conta deletada com sucesso!"
        } else {
            return "Conta com esse id não encontrado!";
        }
    }

    async findFornecedororCategoria(text, datainicio, datafim, limit){
        const search = `%${text}%`
        const despesas = Pagar.findFornecedororCategoria(search, datainicio, datafim, limit);
        return despesas;
    }

    async findFornecedororCategoriaFixas(text, datainicio, datafim, limit) {
        const search = `%${text}%`
        const despesas = Pagar.findFornecedororCategoriaFixas(search, datainicio, datafim, limit);
        return despesas;
    }

    async findFornecedororCategoriaVariaveis(text, datainicio, datafim, limit) {
        const search = `%${text}%`
        const despesas = Pagar.findFornecedororCategoriaVariaveis(search, datainicio, datafim, limit);
        return despesas;
    }

    async alterPago(pago, data_pagamento, id){
        const desp = await Pagar.findById(id);
        await Pagar.alterPago(desp[0], pago, data_pagamento);
        return "Despesa alterada com sucesso!";
    }

    async update(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, parcelamento, data_vencimento, id){
        const conta = new Pagar(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, parcelamento, data_vencimento, id);        
        console.log("conta", conta);
        try {
            await conta.update();
            return "Conta alterada com sucesso!";
        } catch (err) {
            return err;
        }
    }
}

export default new PagarController();