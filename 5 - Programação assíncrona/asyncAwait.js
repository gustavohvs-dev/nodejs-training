function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var error = false;
            if(!error){
                resolve({msg: "SUCESS", code: 1})
            }else{
                reject({msg: "FAILED", code: 2, err: "Falhou"})
            }
        }, 4000)
    })
}

async function principal(){
    try {
        var email = await enviarEmail("Olá!", "gustavo@gmail.com");
        console.log(email.msg)
    }catch(error){
        console.log(error.msg)
    }
    
}

principal()