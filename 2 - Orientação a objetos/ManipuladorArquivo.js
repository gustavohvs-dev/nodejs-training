class Escritor{
    escrever(){
        console.log("Escrevendo...");
    }
}

class Leitor{
    leitor(){
        console.log("Lendo...");
    }
}

class ManipuladorArquivo{
    constructor(nome){
        this.arquivo = nome;
        this.escritor = new Escritor();
        this.leitor = new Leitor();
    }
}

var manipulador = new ManipuladorArquivo("meuArquivo.txt");
manipulador.escritor.escrever();