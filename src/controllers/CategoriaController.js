import Categoria from '../models/Categoria';

class CategoriaController{
    async listAll(page){
        const categorias = await Categoria.findAll(page);
        return categorias;
    }

    async add(titulo){
        const categoria = new Categoria(titulo);
        try{
            await categoria.create();
            return "Categoria criada com sucesso!";
        }catch(e){
            return err;
        }
    }

    async findById(id) {
        const categoria = await Categoria.findById(id);
        if (categoria.length > 0) {
            return categoria[0];
        } else {
            return "Categoria com esse id não encontrado!";
        }
    }

    async update(titulo, id) {
        const categoria = new Fornecedor(titulo, id);
        try {
            await categoria.update();
            return "Categoria alterado com sucesso!";
        } catch (err) {
            return err;
        }
    }

    async remove(id) {
        const categoriadeleted = await Categoria.delete(id)
        if (categoriadeleted == 1) {
            return "Categoria deletado com sucesso!"
        } else {
            return "Categoria com esse id não encontrado!";
        }
    }
}

export default new CategoriaController();