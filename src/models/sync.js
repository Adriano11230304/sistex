import User from './User';
import sequelize from './configDatabase';

/*User.hasMany(Pagar);
Pagar.belongsTo(User);*/

console.log('Sync Models');

sequelize.sync({
    force: true
});