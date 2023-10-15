import db from './configDatabase'

class Fornecedor {

    id;
    name
    email;
    cnpj

    constructor(name, email, cnpj) {
        this.name = name;
        this.email = email;
        this.cnpj = cnpj;
        console.log("constructor fornecedor");
    }


    static findAll() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM fornecedores;",
                    [],
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
                    "SELECT * FROM fornecedores WHERE id = ?;",
                    [id],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    static findByNameorEmail(name) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM fornecedores WHERE name LIKE ?;",
                    [name],
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
                    "INSERT INTO fornecedores (name, email, cnpj) values (?, ?, ?);",
                    [this.name, this.email, this.cnpj],
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
                    "DELETE FROM fornecedores WHERE id=?;",
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


export default Fornecedor;