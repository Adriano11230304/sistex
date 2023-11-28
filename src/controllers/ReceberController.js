import Receber from '../models/Receber';

class ReceberController {
    async listAll(page, datainicio, datafim, recebidas = false, naoRecebidas = false) {
        const contas = Receber.findAll(page, datainicio, datafim, recebidas, naoRecebidas);
        return contas;
    }

    async listAllNoPage(datainicio, datafim) {
        const contas = Receber.findAllNoPage( datainicio, datafim);
        return contas;
    }

    async listAllAll() {
        const contas = Receber.findAllAll();
        return contas;
    }

    async add(valor, parcelas, parcelamento, observacoes, data_entrada, recebida, data_recebimento, cliente_id, forma_recebimento, data_vencimento) {
        const receita = new Receber(valor, parcelas, parcelamento, observacoes, data_entrada, recebida, data_recebimento, cliente_id, forma_recebimento, data_vencimento);
        console.log("create", receita);
        try {
            await receita.create();
            return "Receita adicionado com sucesso!";
        } catch (err) {
            return err;
        }

    }
    
    async findById(id) {
        const receita = await Receber.findById(id);
        if (receita.length > 0) {
            return receita[0];
        } else {
            return "receita com esse id não encontrado!";
        }
    }

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

    async update(rec) {
        const receita = new Receber(rec.valor, rec.parcelas, rec.parcelamento, rec.observacoes, rec.data_entrada, rec.recebida, rec.data_recebimento, rec.cliente_id, rec.forma_recebimento, rec.data_vencimento);
        console.log("receita", receita);
        try {
            await receita.update();
            return "Receita alterada com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async alterReceber(recebida, data_recebimento, id) {
        console.log("data_recebimento", data_recebimento);
        console.log("recebida", recebida);
        const rec = await Receber.findById(id);
        console.log("rec", rec);
        await Receber.alterReceber(rec[0], recebida, data_recebimento);
        return "Receita alterada com sucesso!";
    }
}

export default new ReceberController();