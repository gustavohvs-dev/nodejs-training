const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "AIWFV|</A|V3ArR)";

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function auth(req, res, next){
    const authToken = req.headers['authorization'];
    if(authToken == undefined){
        res.status(401);
        res.json({err: "Token inválido"})
    }else{
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err){
                res.status(401);
                res.json({err: "Token inválido"});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });
    }
    
}

var DB = {
    games: [
        {
            id: 23,
            title: "Call of Duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 32,
            title: "Sea of thieves",
            year: 2018,
            price: 60
        },
        {
            id: 42,
            title: "Minecraft",
            year: 2018,
            price: 90
        }
    ],
    users: [
        {
            id: 1,
            name: "Gustavo Soares",
            email: "gustavohvs.dev@gmail.com",
            password: "nodejs<3"
        }
    ]
}

app.get("/games", auth, (req, res) => {
    res.statusCode = 200;
    res.json(DB.games)
});

app.get("/game/:id", auth, (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id === id);
        if(game == undefined){
            res.sendStatus(404);
        }else{
            res.statusCode = 200;
            res.json(game);
        }
    }
});

app.post("/game", auth, (req, res) => {
    var {title, price, year} = req.body;
    DB.games.push({
        id: 2323,
        title,
        price,
        year
    })
    res.sendStatus(200);
});

app.delete("/game/:id", auth, (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200)
        }
    }
});

app.put("/game/:id", auth, (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id === id);
        if(game == undefined){
            res.sendStatus(404);
        }else{
            var {title, price, year} = req.body;
            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }
            res.sendStatus(200);
        }
    }
});

app.post("/auth", (req, res) => {
    var {email, password} = req.body;
    if(email == undefined){
        res.status(400);
        res.json = ({err: "E-mail inválido"});
    }else{
        var user = DB.users.find(u => u.email == email);
        if(user == undefined){
            res.status(400);
            res.json({err: "Falha ao autenticar"});
        }else{
            if(user.password != password){
                res.status(400);
                res.json({err: "Falha ao autenticar"});
            }else{
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
                    if(err){
                        res.status(500);
                        res.json({err: "Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });
            }
        }
    }
})

app.listen(45678, () => {
    console.log("API RODANDO!");
})