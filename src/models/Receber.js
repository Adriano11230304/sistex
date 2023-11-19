import db from './configDatabase'

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


    constructor(valor, parcelas, parcelamento, observacoes, data_entrada, recebida, data_recebimento, cliente_id, forma_recebimento, id = 1){
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
    }

    create(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO receber (valor, observacoes, parcelas, cliente_id, created_at, data_entrada, recebida, data_recebimento, forma_recebimento, parcelamento) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [this.valor, this.observacoes, this.parcelas, this.cliente_id, this.created_at, this.data_entrada, this.recebida, this.data_recebimento, this.forma_recebimento, this.parcelamento],
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
            db.transaction((tx) => {
                if (recebidas || naoRecebidas) {
                    tx.executeSql(
                        "SELECT * FROM receber WHERE data_entrada >= ? AND data_entrada < ? AND recebida = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, recebidas, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                } else {
                    tx.executeSql(
                        "SELECT * FROM receber WHERE data_entrada >= ? AND data_entrada < ? AND recebida = ? ORDER BY data_entrada asc LIMIT ? OFFSET ?;",
                        [datainicio, datafim, recebidas, limit, offset],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error)
                    );
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
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
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT receber.id, receber.valor, receber.cliente_id, clientes.name, receber.data_entrada, receber.data_recebimento, receber.forma_recebimento, receber.recebida FROM receber INNER JOIN clientes ON clientes.id = receber.cliente_id WHERE receber.data_entrada >= ? and receber.data_entrada < ? AND (clientes.name LIKE ? OR receber.forma_recebimento LIKE ?) ORDER BY receber.data_entrada asc LIMIT ?",
                    [datainicio, datafim, text, text, limit],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }
}

export default Receber;