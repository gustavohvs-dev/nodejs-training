class Animal{
    constructor(nome){
        this.nome = nome;
    }
}

class Cachorro extends Animal{
    constructor(nome){
        super(nome);
    }
    latir(){
        console.log("Latindo...");
    }
}

var tom = new Cachorro("Tom");
tom.latir();
console.log(tom.nome)