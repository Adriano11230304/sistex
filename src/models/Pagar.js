import Database from '../models/Database'

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
    forma_pagamento;
    parcelamento;
    data_vencimento;

    constructor(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, parcelamento, data_vencimento,id = 1) {
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
        this.forma_pagamento = forma_pagamento;
        this.parcelamento = parcelamento;
        this.data_vencimento = data_vencimento;
    }


    static findAllAll() {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM pagar;",
                        [],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
            });
        });
    }

    static findAll(page, datainicio, datafim, pagas = false, naoPagas = false) {
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 25;
        const limit = 25;
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                if (pagas || naoPagas) {
                    tx.executeSql(
                        "SELECT * FROM pagar WHERE data_entrada >= ? AND data_entrada < ? AND pago = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, pagas, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                } else {
                    tx.executeSql(
                        "SELECT * FROM pagar WHERE data_entrada >= ? and data_entrada < ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            });
        });
    }

    static findAllFixas(page, datainicio, datafim, pagas = false, naoPagas = false){
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 25;
        const limit = 25;
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                if (pagas || naoPagas) {
                    tx.executeSql(
                        "SELECT * FROM pagar WHERE data_entrada >= ? AND data_entrada < ? AND pago = ? AND fixa = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, pagas, true, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                } else {
                    tx.executeSql(
                        "SELECT * FROM pagar WHERE data_entrada >= ? and data_entrada < ? AND fixa = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, true, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            });
        });
    }

    static findAllVariaveis(page, datainicio, datafim, pagas = false, naoPagas = false) {
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 25;
        const limit = 25;
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                if (pagas || naoPagas) {
                    tx.executeSql(
                        "SELECT * FROM pagar WHERE data_entrada >= ? AND data_entrada < ? AND pago = ? AND fixa = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, pagas, false, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                } else {
                    tx.executeSql(
                        "SELECT * FROM pagar WHERE data_entrada >= ? and data_entrada < ? AND fixa = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, false, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
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
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO pagar (valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento, forma_pagamento, parcelamento, data_vencimento) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [this.valor, this.observacoes, this.parcelas, this.fixa, this.categoria_id, this.fornecedor_id, this.created_at, this.data_entrada, this.pago, this.data_pagamento, this.forma_pagamento, this.parcelamento, this.data_vencimento],
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
            Database.db.transaction((tx) => {
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
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT pagar.id, pagar.valor, pagar.categoria_id, pagar.fornecedor_id, fornecedores.name, categorias.titulo, pagar.data_entrada, pagar.data_pagamento, pagar.forma_pagamento, pagar.pago, pagar.fixa FROM pagar INNER JOIN fornecedores ON fornecedores.id = pagar.fornecedor_id INNER JOIN categorias ON categorias.id = pagar.categoria_id  WHERE pagar.data_entrada >= ? and pagar.data_entrada < ? AND (fornecedores.name LIKE ? OR categorias.titulo LIKE ?) ORDER BY pagar.data_entrada asc LIMIT ?",
                    [datainicio, datafim, text, text, limit],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findFornecedororCategoriaVariaveis(text, datainicio, datafim, limit) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT pagar.id, pagar.valor, pagar.categoria_id, pagar.fornecedor_id, fornecedores.name, categorias.titulo, pagar.data_entrada, pagar.data_pagamento, pagar.forma_pagamento, pagar.pago, pagar.fixa FROM pagar INNER JOIN fornecedores ON fornecedores.id = pagar.fornecedor_id INNER JOIN categorias ON categorias.id = pagar.categoria_id  WHERE pagar.data_entrada >= ? and pagar.data_entrada < ? AND pagar.fixa = ? AND (fornecedores.name LIKE ? OR categorias.titulo LIKE ?) ORDER BY pagar.data_entrada asc LIMIT ?",
                    [datainicio, datafim, false, text, text, limit],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findFornecedororCategoriaFixas(text, datainicio, datafim, limit) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT pagar.id, pagar.valor, pagar.categoria_id, pagar.fornecedor_id, fornecedores.name, categorias.titulo, pagar.data_entrada, pagar.data_pagamento, pagar.forma_pagamento, pagar.pago, pagar.fixa, pagar.data_vencimento FROM pagar INNER JOIN fornecedores ON fornecedores.id = pagar.fornecedor_id INNER JOIN categorias ON categorias.id = pagar.categoria_id  WHERE pagar.data_entrada >= ? and pagar.data_entrada < ? AND pagar.fixa = ? AND (fornecedores.name LIKE ? OR categorias.titulo LIKE ?) ORDER BY pagar.data_entrada asc LIMIT ?",
                    [datainicio, datafim, true, text, text, limit],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static alterPago(desp, pago, data_pagamento) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE pagar SET pago = ?, data_pagamento = ? WHERE id = ?;",
                    [pago, data_pagamento, desp.id],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting obj: " + JSON.stringify(obj));
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    update(){
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE pagar SET valor = ?, observacoes = ?, data_entrada = ?, data_pagamento = ?, fixa = ?, categoria_id = ?, fornecedor_id = ?, pago = ?, forma_pagamento = ?, data_vencimento = ? WHERE id = ?;",
                    [this.valor, this.observacoes, this.data_entrada, this.data_pagamento, this.fixa, this.categoria_id, this.fornecedor_id, this.pago, this.forma_pagamento, this.data_vencimento, this.id],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting obj: " + JSON.stringify(obj));
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
}


export default Pagar;