import Fornecedor from '../models/Fornecedor'

class FornecedorController {
    async listAll(page) {
        const fornecedores = await Fornecedor.findAll(page)
        return fornecedores;
    }

    async listAllAll() {
        const fornecedores = await Fornecedor.findAllAll()
        return fornecedores;
    }

    async add(name, email, cnpj) {
        const fornecedor = new Fornecedor(name, email, cnpj);
        try {    
            await fornecedor.create();
            return "Fornecedor adicionado com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async update(name, email, cnpj, id) {
        const fornecedor = new Fornecedor(name, email, cnpj, id);
        try {    
            await fornecedor.update();
            return "Fornecedor alterado com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async findById(id) {
        const fornecedor = await Fornecedor.findById(id);
        if (fornecedor.length > 0) {
            return fornecedor[0];
        } else {
            return "Fornecedor com esse id não encontrado!";
        }
    }

    async findNameorEmail(name, limit){
        const search = `%${name}%`
        const fornecedor = await Fornecedor.findByNameorEmail(search, limit);
        return fornecedor;
    }

    async remove(id) {
        const fornecedordeleted = await Fornecedor.delete(id)
        if (fornecedordeleted == 1) {
            return "Fornecedor deletado com sucesso!"
        } else {
            return "Fornecedor com esse id não encontrado!";
        }
    }


}


export default new FornecedorController();