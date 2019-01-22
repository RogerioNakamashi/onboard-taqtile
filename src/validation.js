const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegex = /^[a-zA-Z]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

class Validation {

    static email(email){
        if(email.match(emailRegex)==null){
            return false;
        }else{
            return true;
        }
    }

   static password(password){
        if(password.match(passwordRegex)==null){
            return false;
        }else{
            return true;
        }
    }

   static name(name){
        if(name.match(nameRegex)==null){
            return false;
        }else{
            return true;
        }
    }
}

export default Validation;