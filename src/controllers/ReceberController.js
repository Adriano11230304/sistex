import Receber from '../models/Receber';

class ReceberController {
    async listAll(page, datainicio, datafim, recebidas = false, naoRecebidas = false) {
        const contas = Receber.findAll(page, datainicio, datafim, recebidas, naoRecebidas);
        return contas;
    }

    async add(valor, parcelas, parcelamento, observacoes, data_entrada, recebida, data_recebimento, cliente_id, forma_recebimento, data_vencimento) {
        const conta = new Receber(valor, parcelas, parcelamento, observacoes, data_entrada, recebida, data_recebimento, cliente_id, forma_recebimento, data_vencimento);
        console.log(conta);
        try {
            await conta.create();
            return "Conta adicionado com sucesso!";
        } catch (err) {
            return err;
        }

    }
    /*
    async findById(id) {
        const conta = await Pagar.findById(id);
        if (conta.length > 0) {
            return conta[0];
        } else {
            return "despesa com esse id não encontrado!";
        }
    }*/

    async remove(id) {
        const receberdeleted = await Receber.delete(id)
        if (receberdeleted == 1) {
            return "Receita deletada com sucesso!"
        } else {
            return "Receita com esse id não encontrado!";
        }
    }

    async findClientesorForma(text, datainicio, datafim, limit) {
        const search = `%${text}%`
        const receitas = Receber.findClienteorForma(search, datainicio, datafim, limit);
        return receitas;
    }

    /*async findFornecedororCategoriaFixas(text, datainicio, datafim, limit) {
        const search = `%${text}%`
        const despesas = Pagar.findFornecedororCategoriaFixas(search, datainicio, datafim, limit);
        return despesas;
    }

    async findFornecedororCategoriaVariaveis(text, datainicio, datafim, limit) {
        const search = `%${text}%`
        const despesas = Pagar.findFornecedororCategoriaVariaveis(search, datainicio, datafim, limit);
        return despesas;
    }

    async alterPago(pago, data_pagamento, id) {
        const desp = await Pagar.findById(id);
        await Pagar.alterPago(desp[0], pago, data_pagamento);
        return "Despesa alterada com sucesso!";
    }

    async update(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, id) {
        const conta = new Pagar(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, id);
        try {
            await conta.update();
            return "Conta alterada com sucesso!";
        } catch (err) {
            return err;
        }
    }*/
}

export default new ReceberController();