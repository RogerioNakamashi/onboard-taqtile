export class Save{

    static name(name){
        localStorage.setItem("name", name);
    }    
    static token(token){
        localStorage.setItem("token", token);
    }
    static password(password){
        localStorage.setItem("password", password);
    }
    static id(id){
        localStorage.setItem("id", id);
    }
    static email(email){
        localStorage.setItem("email", email);
    }
    static role(role){
        localStorage.setItem("role", role);
    }
    static users(users){
        localStorage.setItem("users", users)
    }
}

export class Get{
    static name(){
        return localStorage.getItem("name");
    }    
    static token(){
        return localStorage.getItem("token");
    }
    static password(){
        return localStorage.getItem("password");
    }
    static id(){
        return localStorage.getItem("id");
    }
    static email(){
        return localStorage.getItem("email");
    }
    static role(){
        return localStorage.getItem("role");
    }
    static users(){
        return localStorage.getItem("users");
    }
}

