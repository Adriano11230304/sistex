import db from './configDatabase'

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, verified_email BOOLEAN, name TEXT, picture TEXT, id_gmail TEXT);"
    );
});

class UserPersistence{

    findAll(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM users;",
                    [],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(error)
                );
            });
        });
    }

    create(obj){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO users (email, verified_email, name, picture, id_gmail) values (?, ?, ?, ?, ?);",
                    [obj.email, obj.verified_email, obj.name, obj.picture, obj.id_gmail],
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


export default new UserPersistence();