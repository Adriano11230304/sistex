import Pagar from '../models/Pagar';

class PagarController{
    async listAll(page, datainicio, datafim){
        const contas = Pagar.findAll(page, datainicio, datafim);
        return contas;
    }

    async add(valor, observacoes, parcelas, fixa, categoria, fornecedor_id, created_at, data_entrada, pago, data_pagamento){
        const conta = new Pagar(valor, observacoes, parcelas, fixa, categoria, fornecedor_id, created_at, data_entrada, pago, data_pagamento);
        try {
            await conta.create();
            return "Conta adicionado com sucesso!";
        } catch (err) {
            return err;
        }

    }

    async findById(id) {
        console.log(id);
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
}

export default new PagarController();