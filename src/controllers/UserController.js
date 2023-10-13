import User from '../models/User'

class UserController{
    async listAll(){
        const users = await User.findAll()
        return users;
    }

    async findUser(email){
        const user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        })

        return user;
    }

    async add(email, verified_email, given_name, picture, id_gmail){
        const user = new User(email, verified_email, given_name, picture, id_gmail);
        try{
            if (email == null || verified_email == null || given_name == null || picture == null || id_gmail == null){
                return "Não foi informado todos os dados, dados necessários: email, verified_email, given_name, picture, id_gmail";    
            }else{
                await user.create();
                return "Usuário adicionado com sucesso!";
            }
        }catch(err){
            return err;
        }
        
        return userAdd;
    }

    async findById(id){
        const user = await User.findById(id);
        if(user.length > 0){
            return user[0];
        }else{
            return "Usuário com esse id não encontrado!";
        }
    }

    async remove(id){
        const userdeleted = await User.delete(id)
        if(userdeleted == 1){
            return "Usuário deletado com sucesso!"
        }else{
            return "Usuário com esse id não encontrado!";
        }
    }


}


export default new UserController();