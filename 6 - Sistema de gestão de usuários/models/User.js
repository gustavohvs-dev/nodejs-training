var knex = require("../database/connection")
var bcrypt = require("bcrypt")

class User{

    async findAll(){
        try {
            var result = await knex.select(['id', 'name', 'email', 'role']).table("users");
            return result;
        }catch(error){
            console.log(error);
            return [];
        } 
    }

    async findById(id){
        try {
            var result = await knex.select(['id', 'name', 'email', 'role']).where({id:id}).table("users");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(error){
            console.log(error);
            return [];
        } 
    }

    async new(email, password, name){

        try{
            var hash = await bcrypt.hash(password, 10)
            await knex.insert({email, password: hash, name, role:0}).table("users")
        }catch(err){
            console.log(err)
        }
        
    }

    async findEmail(email){
        try {
            var result = await knex.select("*").from("users").where({email: email});
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(error){
            return false;
        }
    }

    async update(id, email, name, role){
        var user = await this.findById(id);

        var editUser = {};

        if(user == undefined){
            return {status: false, err: "O usuário não existe"}
        }
            
        if(email != undefined){
            if(email==user.email){
                return {status: false, err: "Informe um email diferente do anterior"}
            }else{
                var result = await this.findEmail(email)
                if(result == true){
                    return {status: false, err: "Este email já existe no banco de dados"}
                }else{
                    editUser.email = email;
                }
            }
        }

        if(name != undefined){
            editUser.name = name;
        }

        if(role != undefined){
            editUser.role = role;
        }

        try {
            await knex.update(editUser).where({id: id}).table("users")
            return {status: true}
        } catch (error) {
            console.log(error);
            return {status: false, err: error}
        }
       

    }

    async delete(id){
        var user = await this.findById(id)
        if(user == undefined){
            return {status: false, err: "O usuário não existe"}
        }else{
            try {
                var result = await knex.delete().where({id: id}).table("users")
                return {status: true, err: "Usuário deletado com sucesso"}
            } catch (error) {
                return {status: false, err: error}
            }
            
        }
    }

}

module.exports = new User();