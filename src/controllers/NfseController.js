import Nfse from '../models/Nfse'

class NfseController {
    async listAll(page) {
        const nfse = await Nfse.findAll(page)
        return nfse;
    }

    async listAllAll() {
        const nfse = await Nfse.findAllAll()
        return nfse;
    }

    async add(cliente_id, descricao, valor) {
        const nfse = new Nfse(cliente_id, descricao, valor);
        try {
            await nfse.create();
            return "Nfse adicionado com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async findById(id) {
        const nfse = await Nfse.findById(id);
        if (nfse.length > 0) {
            return nfse[0];
        } else {
            return "Nfse com esse id não encontrado!";
        }
    }

    async remove(id) {
        const nfsedeleted = await Nfse.delete(id)
        if (nfsedeleted == 1) {
            return "NFse deletado com sucesso!"
        } else {
            return "NFse com esse id não encontrado!";
        }
    }


}


export default new NfseController();