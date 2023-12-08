import * as SQLite from 'expo-sqlite';

class Database{
    db;

    constructor(db){
        this.db = db;
        this.db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS users ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "email TEXT, "+
                "verified_email BOOLEAN, "+
                "name TEXT, "+
                "picture TEXT, "+
                "id_gmail TEXT, "+
                "token TEXT);"
                , [],
                () => console.log(`Tabela users criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS fornecedores ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "name TEXT, "+
                "email TEXT, "+
                "cnpj TEXT);"
                , [],
                () => console.log(`Tabela fornecedores criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS categorias ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "titulo TEXT);"
                , [],
                () => console.log(`Tabela categorias criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS notificacoes ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "texto TEXT);"
                , [],
                () => console.log(`Tabela notificacoes criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela notificacoes`, e)
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS pagar ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "valor FLOAT, "+
                "observacoes TEXT, "+
                "parcelas INTEGER, "+
                "fixa BOOLEAN, "+
                "categoria_id INTEGER, "+
                "fornecedor_id INTEGER, "+
                "created_at TIMESTAMP, "+
                "data_entrada TIMESTAMP, "+
                "pago BOOLEAN, "+
                "data_pagamento TIMESTAMP, "+
                "forma_pagamento TEXT, "+
                "parcelamento BOOLEAN, "+
                "data_vencimento TIMESTAMP, "+
                "FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id), "+
                "FOREIGN KEY(categoria_id) REFERENCES categorias(id));"
                , [],
                () => console.log(`Tabela pagar criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
            );
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS clientes ("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                "name TEXT, "+
                "email TEXT, "+
                "cnpj TEXT);"
                , [],
                () => console.log(`Tabela clientes criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
            );
        
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
                'data_vencimento TIMESTAMP,'+
                'FOREIGN KEY(cliente_id) REFERENCES clientes(id)' +
                ');'
                , [],
                () => console.log(`Tabela receber criada com sucesso`),
                (tx, e) => console.log(`Erro ao criar a tabela receber`, e)
            );
        });
    }

    setDb(db){
        this.db = db;
    }

    closeDb(){
        this.db.closeAsync();
    }
}

const db = SQLite.openDatabase("sistex.db")

export default new Database(db);