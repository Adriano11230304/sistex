import Database from '../models/Database'

class Notificacao{
    id;
    texto;
    type;

    constructor(texto, type, id = 1){
        this.id = id;
        this.type = type;
        this.texto = texto;
    }

    static findAll(page){
        if (page < 1) {
            const vazio = []
            return vazio;
        }
        const offset = (page - 1) * 30;
        const limit = 30;
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM notificacoes ORDER BY texto asc LIMIT ? OFFSET ?;",
                    [limit, offset],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findAllDate() {
        const date = Date.now();
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM notificacoes WHERE created_at <= ?;",
                    [date],
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
                    "SELECT * FROM notificacoes WHERE id = ?;",
                    [id],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    create() {
        const date = Date.now();
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO notificacoes (texto, created_at, type) values (?, ?, ?);",
                    [this.texto, date, this.type],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting obj: " + JSON.stringify(obj));
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            Database.db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM notificacoes WHERE id = ?;",
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

export default Notificacao;