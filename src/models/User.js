import db from './configDatabase'

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, verified_email BOOLEAN, name TEXT, picture TEXT, id_gmail TEXT);"
    );
});

class User{

    id;
    email;
    verified_email;
    name;
    picture;
    id_gmail;

    constructor(email, verified_email, name, picture, id_gmail) {
        this.email = email;
        this.verified_email = verified_email;
        this.name = name;
        this.picture = picture;
        this.id_gmail = id_gmail;
        console.log("constructor");
    }


    static findAll(){
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

    create(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO users (email, verified_email, name, picture, id_gmail) values (?, ?, ?, ?, ?);",
                    [this.email, this.verified_email, this.name, this.picture, this.id_gmail],
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
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM users WHERE id=?",
                    [id],
                    (_, { rows }) => {
                        resolve(rows);
                    },
                    (_, error) => reject(error)
                );
            })
        })
    };
}


export default User;