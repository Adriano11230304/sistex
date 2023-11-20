import db from './configDatabase'

class User{

    id;
    email;
    verified_email;
    name;
    picture;
    id_gmail;

    constructor(email, verified_email, name, picture, id_gmail, token) {
        this.email = email;
        this.verified_email = verified_email;
        this.name = name;
        this.picture = picture;
        this.id_gmail = id_gmail;
        this.token = token;
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

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM users WHERE id = ?;",
                    [id],
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
                    "INSERT INTO users (email, verified_email, name, picture, id_gmail, token) values (?, ?, ?, ?, ?, ?);",
                    [this.email, this.verified_email, this.name, this.picture, this.id_gmail, this.token],
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
                    "DELETE FROM users WHERE id=?;",
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


export default User;