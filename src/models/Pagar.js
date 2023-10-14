import db from './configDatabase'

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pagar (id INTEGER PRIMARY KEY AUTOINCREMENT, valor FLOAT, fixa BOOLEAN, categoria TEXT, fornecedor_id INTEGER, data_entrada DATE, FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id));"
    );
});

class Pagar {

    id;
    valor;
    despesa_fixa;
    categoria;
    fornecedor_id;
    data_entrada;

    constructor(valor, despesa_fixa, categoria, fornecedor_id, data_entrada) {
        this.valor = valor;
        this.despesa_fixa = despesa_fixa;
        this.categoria = categoria;
        this.fornecedor_id = fornecedor_id;
        this.data_entrada = data_entrada;
        console.log("constructor pagar");
    }


    static findAll() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM pagar;",
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
                    "INSERT INTO pagar (valor, fixa, categoria, fornecedor_id, data_entrada) values (?, ?, ?, ?, ?);",
                    [this.valor, this.despesa_fixa, this.categoria, this.fornecedor_id, this.data_entrada],
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