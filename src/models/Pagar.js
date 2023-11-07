import db from './configDatabase'

class Pagar {

    id;
    valor;
    observacoes;
    parcelas;
    fixa;
    categoria;
    fornecedor_id;
    created_at;
    data_entrada;
    pago;
    data_pagamento;

    constructor(valor, observacoes, parcelas, fixa, categoria, fornecedor_id, created_at, data_entrada, pago, data_pagamento, id = 1) {
        this.id = id;
        this.valor = valor;
        this.observacoes = observacoes;
        this.parcelas = parcelas;
        this.fixa = fixa;
        this.categoria = categoria;
        this.fornecedor_id = fornecedor_id;
        this.created_at = created_at;
        this.data_entrada = data_entrada;
        this.pago = pago;
        this.data_pagamento = data_pagamento;

        console.log("constructor pagar");
    }


    static findAll(page, datainicio, datafim) {
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 25;
        const limit = 25;
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM pagar WHERE data_entrada >= ? and data_entrada <= ?;",
                    [datainicio, datafim],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
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
                    "INSERT INTO pagar (valor, observacoes, parcelas, fixa, categoria, fornecedor_id, created_at, data_entrada, pago, data_pagamento) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [this.valor, this.observacoes, this.parcelas, this.fixa, this.categoria, this.fornecedor_id, this.created_at, this.data_entrada, this.pago, this.data_pagamento],
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
}


export default Pagar;