import Notificacao from '../models/Notificacao';

class NotificacaoController{
    async listAll(page){
        const notificacoes = await Notificacao.findAll(page);
        return notificacoes;
    }
    async listAllDate() {
        try{
            const notificacoes = await Notificacao.findAllDate();
            console.log(notificacoes);
            return notificacoes;
        }catch(e){
            console.log(e);
            return e;
        }
        
        
    }

    async add(texto, type){
        const notificacao = new Notificacao(texto, type);
        try{
            await notificacao.create();
            return "Notificação criada com sucesso!";
        }catch(e){
            return err;
        }
    }

    async findById(id) {
        const notificacao = await Notificacao.findById(id);
        if (notificacao.length > 0) {
            return notificacao[0];
        } else {
            return "Notificação com esse id não encontrado!";
        }
    }

    async remove(id) {
        const notificacaodeleted = await Notificacao.delete(id)
        if (notificacaodeleted == 1) {
            return "Notificacao deletado com sucesso!"
        } else {
            return "Notificacao com esse id não encontrado!";
        }
    }
}

export default new NotificacaoController();