function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var error = true;
            if(!error){
                resolve({msg: "SUCESS", code: 1})
            }else{
                reject({msg: "FAILED", code: 2, err: "Falhou"})
            }
        }, 4000)
    })
}

enviarEmail("Olá!", "gustavo@gmail.com").then((data) => {
    console.log(data.msg)
}).catch((data) => {
    console.log(data.msg)
})