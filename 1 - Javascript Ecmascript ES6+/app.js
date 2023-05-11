//Constantes

const constanteTeste = 1;
console.log(constanteTeste)

//Let e escopo
var nome = "Gustavo"; //Escopo Global e Local
let nome2 = "Soares"; //Escopo Global, Local (dentro de function) e Bloco {}

//Parâmetros opcionais
function soma(a, b = 50)
{
    console.log(a+b);
}
soma(20)

//JSON encurtados
var nome = "Victor Luna";
var idade = 20;
var user = {
    nome: nome,
    idade: idade
}
var user2 = {
    nome, idade
}
console.log(user)
console.log(user2)

//Operador Spreed
var empresa = {
    nome: "Teste",
    cidade: "São Paulo",
    email: "teste@gmail.com"
}

var empresa2 = {
    ...empresa,
    telefone: "(31) 3012-4091"
}

console.log(empresa2)

//Desestruturação
var meuJson = {
    campo1: "Teste1",
    campo2: "Teste2",
    campo3: "Teste3",
}

var { campo1, campo2, campo3 } = meuJson;

console.log(campo1);

//Arrow function
function mult1(a,b)
{
    console.log(a*b);
}

var mult2 = function(a,b)
{
    console.log(a*b);
}

var mult3 = (a,b) => {
    console.log(a*b);
}

//Find
var gustavo = {
    nome: "Gustavo Soares",
    email: "gustavo@gmail.com"
}

var gabriel = {
    nome: "Gabriel Soares",
    email: "gabriel@gmail.com"
}

var thayna = {
    nome: "Thayná Silva",
    email: "thayna@gmail.com"
}

var users = [gustavo, gabriel, thayna];
var usuario = users.find(user => user.nome === "Gustavo Soares");
console.log(usuario)

//Literals
var frase = `Olá meu nome é ${gabriel.nome}`
console.log(frase)