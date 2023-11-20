import db from './configDatabase'

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, verified_email BOOLEAN, name TEXT, picture TEXT, id_gmail TEXT, token TEXT);"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, cnpj TEXT);"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT);"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pagar (id INTEGER PRIMARY KEY AUTOINCREMENT, valor FLOAT, observacoes TEXT, parcelas INTEGER, fixa BOOLEAN, categoria_id INTEGER, fornecedor_id INTEGER, created_at TIMESTAMP, data_entrada TIMESTAMP, pago BOOLEAN, data_pagamento TIMESTAMP, forma_pagamento TEXT, parcelamento BOOLEAN, FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id), FOREIGN KEY(categoria_id) REFERENCES categorias(id));"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, cnpj TEXT);"
    );

    /*tx.executeSql(
        'DROP TABLE users;'
        , [],
        () => console.log(`Tabela excluída`),
        (tx, e) => console.log(`Erro ao excluir a tabela receber`, e)
    )*/

    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS receber (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'valor FLOAT,'+
        'observacoes TEXT,' +
        'parcelas INTEGER,' +
        'parcelamento BOOLEAN,' +
        'data_entrada TIMESTAMP,' +
        'data_recebimento TIMESTAMP,' +
        'recebida BOOLEAN,' +
        'created_at TIMESTAMP,' +
        'cliente_id INTEGER,' +
        'forma_recebimento TEXT,' +
        'FOREIGN KEY(cliente_id) REFERENCES clientes(id)' +
        ');'
        , [],
        () => console.log(`Tabela receber criada com sucesso`),
        (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
    )
    
    console.log("tabelas criadas!");
});

