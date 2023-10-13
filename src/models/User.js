

class User{
    email;
    verified_email;
    name;
    picture;
    id_gmail;

    constructor(email, verified_email, name, picture, id_gmail){
        this.email = email;
        this.verified_email = verified_email;
        this.name = name;
        this.picture = picture;
        this.id_gmail = id_gmail;
        console.log("constructor");
    }
}

export default User;