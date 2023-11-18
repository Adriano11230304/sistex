import Cliente from '../models/Cliente'

class ClienteController {
    async listAll(page) {
        const clientes = await Cliente.findAll(page)
        return clientes;
    }

    async listAllAll() {
        const clientes = await Cliente.findAllAll()
        return clientes;
    }

    async add(name, email, cnpj) {
        const cliente = new Cliente(name, email, cnpj);
        try {
            await cliente.create();
            return "Cliente adicionado com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async update(name, email, cnpj, id) {
        const cliente = new Cliente(name, email, cnpj, id);
        try {
            await cliente.update();
            return "Cliente alterado com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async findById(id) {
        const cliente = await Cliente.findById(id);
        if (cliente.length > 0) {
            return cliente[0];
        } else {
            return "Cliente com esse id não encontrado!";
        }
    }

    async findNameorEmail(name, limit) {
        const search = `%${name}%`
        const cliente = await Cliente.findByNameorEmail(search, limit);
        return cliente;
    }

    async remove(id) {
        const clientedeleted = await Cliente.delete(id)
        if (clientedeleted == 1) {
            return "Cliente deletado com sucesso!"
        } else {
            return "Cliente com esse id não encontrado!";
        }
    }


}


export default new ClienteController();