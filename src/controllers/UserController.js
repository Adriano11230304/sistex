import User from '../models/User'

class UserController{
    async listAll(){
        const users = await User.findAll()

        return users;
    }

    async findUser(email, password){
        const user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        })

        return user;
    }
}


export default new UserController();