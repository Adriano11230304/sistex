import Pagar from '../models/Pagar';

class PagarController{
    async listAll(page){
        const contas = Pagar.findAll(page);
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
}

export default new PagarController();