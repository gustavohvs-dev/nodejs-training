var User = require("../models/User")

class UserController
{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({status: false, err: "Usuário não encontrado"});
        }else{
            res.status(200);
            res.json({status: true, user: user});
        }
    }

    async create(req, res){
        var { name, email, password } = req.body

        if(email == undefined){
            res.status(400)
            res.json({status: false, err: "Email inválido"})
            return;
        }

        if(name == undefined || password == undefined || name == '' || password == ''){
            res.status(400)
            res.json({status: false, err: "Nome ou senha inválidos"})
            return;
        }

        var emailExists = await User.findEmail(email)
        if(emailExists == true){
            res.status(406)
            res.json({status: false, err: "Email já está cadastrado"})
            return;
        }

        await User.new(email, password, name)
        res.status(200)
        res.json({status: true, info: "Usuário criado com sucesso"})
    }

    async edit(req, res){
        var {id, name, role, email} = req.body
        var result = await User.update(id, email, name, role)
        if(result == undefined){
            res.stattus(400)
            res.json({status: false, err: "Falha ao editar"})
        }else{
            if(!result.status){
                res.status(406)
                res.json({status: false, err: result.err})
            }else{
                res.status(200)
                res.json({status: true, info: "Alterado com sucesso"})
            }
        }
    }
    
    async remove(req, res){
        var id = req.params.id
        var result = await User.delete(id)
        if(!result.status){
            res.status(406)
            res.json(result)
        }else{
            res.status(200)
            res.json(result)
        }
    }

}

module.exports = new UserController();