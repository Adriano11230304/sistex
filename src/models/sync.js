import db from './configDatabase'

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, verified_email BOOLEAN, name TEXT, picture TEXT, id_gmail TEXT);"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, cnpj TEXT);"
    );

    console.log("tabelas criadas!");
});