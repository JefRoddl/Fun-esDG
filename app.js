// 1 - importar o xpress
const express = require('express')
// 2 - criar o servidor
const servidor = express()
// 3 - definir uma rota neste servidor
// Endereço, método, função callback(ação que o servidor vai realizar quando req chegar)
servidor.get('/usuarios', (req, res)=>{
    console.log("Chegou uma requisição!");
    res.send("Vou te mandar uma lista de usuários...");
}) 

// 4 - por o servidor no modo "aguardando requisição"
servidor.listen(3000)

