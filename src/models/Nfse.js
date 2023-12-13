import Database from './Database'

class Nfse {

    id;
    cliente_id;
    descricao;
    valor;

    constructor(cliente_id, descricao, valor, id = 1) {
        this.cliente_id = cliente_id;
        this.descricao = descricao;
        this.valor = valor;
        this.id = id;
    }


    static findAll(page) {
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 30;
        const limit = 30;
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM nfse LIMIT ? OFFSET ?;",
                    [limit, offset],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findAllAll() {
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM nfse;",
                    [],
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
                    "SELECT * FROM nfse WHERE id = ?;",
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
                    "INSERT INTO nfse (cliente_id, descricao, valor) values (?, ?, ?);",
                    [this.cliente_id, this.descricao, this.valor],
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
                    "DELETE FROM nfse WHERE id=?;",
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

export default Nfse;