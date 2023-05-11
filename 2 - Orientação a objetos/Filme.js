class Filme
{
    constructor(titulo, ano){
        this.titulo = titulo;
        this.ano = ano;
        this.genero = '';
        this.diretor = '';
        this.atores = [];
        this.duracao = 0;
    }    

    Reproduzir(){
        console.log("Reproduzindo...")
    }

    Pausar(){
        console.log("Pausado!") 
    }

    Avancar(){
        console.log("Avançando >>") 
    }

    Fechar(){
        console.log("Fechando X") 
    }
}

var starwars = new Filme('Starwars', 1994);
starwars.Avancar();
console.log(starwars.titulo);