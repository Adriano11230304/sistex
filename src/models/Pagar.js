import db from './configDatabase'

class Pagar {

    id;
    valor;
    observacoes;
    parcelas;
    fixa;
    categoria_id;
    fornecedor_id;
    created_at;
    data_entrada;
    pago;
    data_pagamento;

    constructor(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, id = 1) {
        this.id = id;
        this.valor = valor;
        this.observacoes = observacoes;
        this.parcelas = parcelas;
        this.fixa = fixa;
        this.categoria_id = categoria_id;
        this.fornecedor_id = fornecedor_id;
        this.created_at = created_at;
        this.data_entrada = data_entrada;
        this.pago = pago;
        this.data_pagamento = data_pagamento;

        console.log("constructor pagar");
    }


    static findAll(page, datainicio, datafim, fixa = false, variavel = false, pagas = false, naoPagas = false) {
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 25;
        const limit = 25;
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                
                if (fixa || variavel) {
                    if(pagas || naoPagas){
                        tx.executeSql(
                            "SELECT * FROM pagar WHERE data_entrada >= ? AND data_entrada <= ? AND fixa == ? AND pago == ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                            [datainicio, datafim, fixa, pagas, limit, offset],
                            (_, { rows }) => resolve(rows._array),
                            (_, error) => reject(error)
                        );
                    }else{
                        tx.executeSql(
                            "SELECT * FROM pagar WHERE data_entrada >= ? AND data_entrada <= ? AND fixa == ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;;",
                            [datainicio, datafim, fixa, limit, offset],
                            (_, { rows }) => resolve(rows._array),
                            (_, error) => reject(error)
                        );
                    }
                }else{
                    if (pagas || naoPagas) {
                        tx.executeSql(
                            "SELECT * FROM pagar WHERE data_entrada >= ? AND data_entrada <= ? AND pago == ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;;",
                            [datainicio, datafim, pagas, limit, offset],
                            (_, { rows }) => resolve(rows._array),
                            (_, error) => reject(error)
                        );
                    } else {
                        tx.executeSql(
                            "SELECT * FROM pagar WHERE data_entrada >= ? and data_entrada <= ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;;",
                            [datainicio, datafim, limit, offset],
                            (_, { rows }) => resolve(rows._array),
                            (_, error) => reject(error)
                        );
                    }
                }
                
                
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM pagar WHERE id = ?;",
                    [id],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    create() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO pagar (valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [this.valor, this.observacoes, this.parcelas, this.fixa, this.categoria_id, this.fornecedor_id, this.created_at, this.data_entrada, this.pago, this.data_pagamento],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting obj: " + JSON.stringify(obj));
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM pagar WHERE id=?;",
                    [id],
                    (_, { rowsAffected }) => {
                        resolve(rowsAffected);
                    },
                    (_, error) => reject(error)
                );
            })
        })
    };

    static findFornecedororCategoria(text, datainicio, datafim, limit){
        return new Promise((resolve, reject) => {
            console.log(text);
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM pagar INNER JOIN fornecedores ON fornecedores.id = pagar.fornecedor_id WHERE pagar.data_entrada >= ? and pagar.data_entrada <= ? AND fornecedores.name LIKE ? ORDER BY pagar.data_entrada asc LIMIT ?",
                    [datainicio, datafim, text, limit],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }
}


export default Pagar;