import * as SQLite from 'expo-sqlite';
import Sequelize from "rn-sequelize";

const sequelize = new Sequelize({
    dialectModule: SQLite,
    storage: './src/models/bancoSistex.db',
    database: 'bancoSistex',
    // logging: true,
    dialectOptions: {
        version: "1.0",
        description: "Database",
    },
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.log('Unable to connect to the database:', error);
});

export default sequelize;