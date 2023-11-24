import Database from "./Database";

class Backup {
    id;
    tipo;
    data_entrada;

    constructor(tipo, data_entrada, id = 1) {
        this.id = id;
        this.tipo = tipo;
        this.data_entrada = data_entrada;
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
                    "SELECT * FROM backup ORDER BY data_entrada desc LIMIT ? OFFSET ?;",
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
                    "SELECT * FROM backup ORDER BY data_entrada desc;",
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
                    "SELECT * FROM backup WHERE id = ?;",
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
                    "INSERT INTO backup (tipo, data_entrada) values (?, ?);",
                    [this.tipo, this.data_entrada],
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
                    "DELETE FROM backup WHERE id = ?;",
                    [id],
                    (_, { rowsAffected }) => {
                        resolve(rowsAffected);
                    },
                    (_, error) => reject(error)
                )
            })
        })
    }
}

export default Backup;