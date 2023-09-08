import { Sequelize } from 'rn-sequelize';
import sequelize from './configDatabase'

const User = sequelize.define('User', {
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: true,
    modelName: 'users'
});

export default User;