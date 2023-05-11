function enviarEmail(corpo, para, callback){
    setTimeout(() => {
        console.log(`
            Para: ${para}
            ---------------------------------
            ${corpo}
            ---------------------------------
            De: Gustavo Soares
        `)
        callback("OK", 5, "8s")
    }, 5000)
}

console.log("Enviando email...")

enviarEmail("Oi, seja bem-vindo!", "gustavo@gmail.com", (status, amount, time) => {
    console.log("Email enviado")
    console.log(`
        Status: ${status}
        Quantidade: ${amount}
        Tempo: ${time}
    `)
})