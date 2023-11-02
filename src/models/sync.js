import db from './configDatabase'

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, verified_email BOOLEAN, name TEXT, picture TEXT, id_gmail TEXT);"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, cnpj TEXT);"
    );
    /*tx.executeSql(
        "DROP TABLE pagar;"
    );*/
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pagar (id INTEGER PRIMARY KEY AUTOINCREMENT, valor FLOAT, observacoes TEXT, parcelas INTEGER, fixa BOOLEAN, categoria TEXT, fornecedor_id INTEGER, created_at TIMESTAMP, data_entrada TIMESTAMP, pago BOOLEAN, data_pagamento TIMESTAMP, FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id));"
    );


    /*tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pagar (id INTEGER PRIMARY KEY AUTOINCREMENT, valor FLOAT, observacoes TEXT, parcelas INTEGER, fixa BOOLEAN, categoria TEXT, fornecedor_id INTEGER, created_at TIMESTAMP, data_entrada TIMESTAMP, pago BOOLEAN, data_pagamento TIMESTAMP, FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id));"
    );*/

    console.log("tabelas criadas!");
});