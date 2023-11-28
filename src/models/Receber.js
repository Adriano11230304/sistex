import Database from "./Database";

class Receber{
    id;
    valor;
    parcelas;
    parcelamento;
    observacoes;
    data_entrada;
    recebida;
    created_at;
    data_recebimento;
    forma_recebimento;
    data_vencimento;


    constructor(valor, parcelas, parcelamento, observacoes, data_entrada, recebida, data_recebimento, cliente_id, forma_recebimento, data_vencimento, id = 1){
        this.id = id;
        this.valor = valor;
        this.parcelas = parcelas;
        this.parcelamento = parcelamento;
        this.observacoes = observacoes;
        this.data_entrada = data_entrada;
        this.data_recebimento = data_recebimento;
        this.recebida = recebida;
        this.created_at = Date.now();
        this.cliente_id = cliente_id;
        this.forma_recebimento = forma_recebimento;
        this.data_vencimento = data_vencimento;
    }

    create(){
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO receber (valor, observacoes, parcelas, cliente_id, created_at, data_entrada, recebida, data_recebimento, forma_recebimento, parcelamento, data_vencimento) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [this.valor, this.observacoes, this.parcelas, this.cliente_id, this.created_at, this.data_entrada, this.recebida, this.data_recebimento, this.forma_recebimento, this.parcelamento, this.data_vencimento],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting obj: " + JSON.stringify(obj));
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findAll(page, datainicio, datafim, recebidas = false, naoRecebidas = false){
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 25;
        const limit = 25;
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                if (recebidas || naoRecebidas) {
                    tx.executeSql(
                        "SELECT * FROM receber WHERE data_entrada >= ? AND data_entrada < ? AND recebida = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, recebidas, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                } else {
                    tx.executeSql(
                        "SELECT * FROM receber WHERE data_entrada >= ? AND data_entrada < ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            });
        });
    }

    static findAllNoPage(datainicio, datafim) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM receber WHERE data_entrada >= ? AND data_entrada < ? ORDER BY data_entrada asc;",
                    [datainicio, datafim],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findAllAll(){
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM receber;",
                        [],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
              
                })
            });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM receber WHERE id=?;",
                    [id],
                    (_, { rowsAffected }) => {
                        resolve(rowsAffected);
                    },
                    (_, error) => reject(error)
                );
            })
        })
    };

    static findClienteorForma(text, datainicio, datafim, limit) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT receber.id, receber.valor, receber.cliente_id, clientes.name, receber.data_entrada, receber.data_recebimento, receber.forma_recebimento, receber.recebida, receber.data_vencimento FROM receber INNER JOIN clientes ON clientes.id = receber.cliente_id WHERE receber.data_entrada >= ? and receber.data_entrada < ? AND (clientes.name LIKE ? OR receber.forma_recebimento LIKE ?) ORDER BY receber.data_entrada asc LIMIT ?",
                    [datainicio, datafim, text, text, limit],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM receber WHERE id = ?;",
                    [id],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    update(){
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE receber SET valor = ?, observacoes = ?, data_entrada = ?, data_recebimento = ?, cliente_id = ?, recebida = ?, forma_recebimento = ?, data_vencimento = ? WHERE id = ?;",
                    [this.valor, this.observacoes, this.data_entrada, this.data_recebimento, this.cliente_id, this.recebida, this.forma_recebimento, this.data_vencimento, this.id],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting obj: " + JSON.stringify(obj));
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    static alterReceber(rec, recebida, data_recebimento) {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE receber SET recebida = ?, data_recebimento = ? WHERE id = ?;",
                    [recebida, data_recebimento, rec.id],
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

export default Receber;