const fs = require('fs')
const usuarios = require('../databases/usuarios.json')
const bcrypt = require('bcrypt')
const { userInfo } = require('os')
const { table, clear, Console } = require('console')
const { ALL } = require('dns')



// ------------------ FUNÇÃO LISTAR OK -----------
function listar(){
    console.table(usuarios.map(funcaoCallback => {
        return {
        id: funcaoCallback.id,
        nome: funcaoCallback.nome,
        email: funcaoCallback.email}
    }
        ))
}
// ---------- FIM DA FUNÇÃO LISTAR        

// ---------- FUNÇÃO SALVAR OK ----------
function salvar(arrayDeUsuarios){
    fs.writeFileSync('./databases/usuarios.json', JSON.stringify(arrayDeUsuarios,null, 4))
}
// ---------- FIM DA FUNÇÃO SALVAR ----------

// --------- FUNÇÃO CADASTRAR OK ----------
function cadastrar(objeto){  
   let senhaCriptografada = bcrypt.hashSync(objeto.senha, 10)

   let usuario = {
    id: usuarios.length,
    nome: objeto.nome,
    email: objeto.email,
    senha: senhaCriptografada,
    enderecos: [objeto.enderecos],
    formasDePagamento: []
   }

   usuarios.push(usuario)

   salvar(usuarios)
}
// ---------- FIM DA FUNÇÃO CADASTRAR ---------- 

// --------- FUNÇÃO DETALHAR OK ----------
function detalhar(idUsuario){
    let temId = usuarios.find(u => u.id === idUsuario)

         console.log(  "nome: " + temId.nome + "\n" + "E-mail: " + temId.email + "\n" + "\n"); 
    
            console.clear
        console.log("Endereços" + "\n")

        
        console.table(temId.enderecos)
        console.table(temId.formasDePagamento)    
}
// ---------- FIM DA FUNÇÃO DETALHAR ----------
 
// --------- FUNÇÃO REMOVER OK ----------
function remover(idDoUsuarioParaRemover){
    let idIndexado = usuarios.findIndex(u => u.id === idDoUsuarioParaRemover);

    usuarios.splice(idIndexado, 1,)  

    salvar(usuarios)
}
// ---------- FIM DA FUNÇÃO REMOVER ----------

// --------- FUNÇÃO ALTERAR OK ----------
function alterar(novosDados, idUsuario){

    let idIndexado = usuarios.findIndex(u => u.id === idUsuario);

    let senhaCrip = bcrypt.hashSync(novosDados.senha, 5)

        usuarios[idIndexado].nome = novosDados.nome
        usuarios[idIndexado].email = novosDados.email
        usuarios[idIndexado].senha = senhaCrip
        
    salvar(usuarios)
}
// --------- FIM DA FUNÇÃO ALTERAR ----------

// ---------- FUNÇÃO ADDENDEREÇO OK ---------
function addEndereco(novoEndereco, idUsuario){
    let findIndex = usuarios.findIndex(usuario => usuario.id === idUsuario)

    usuarios[findIndex].enderecos.push(novoEndereco)

    salvar(usuarios)  
}
// ---------- FIM DA FUNÇÃO ADDENDEREÇO ----------

// ---------- FUNÇÃO REMOVER ENDEREÇO OK ---------
function removerEndereco(posicaoDoEndereco, idUsuario){
    let findIndex = usuarios.findIndex(usuario => usuario.id === idUsuario)

    usuarios[findIndex].enderecos.splice(posicaoDoEndereco, 1)

    console.log(usuarios)

    /* Essa função nao busca o index do endereço, tem que passa-lo na hora 
    de declarar a função*/
}
// // ---------- FIM DA FUNÇÃO REMOVER ENDEREÇO ---------

// --------- FUNÇÃO ALTERAR ENDEREÇO OK ----------
function alterarEndereco(posicaoDoEndereco, novoEndereco, idUsuario){
    let findIndex = usuarios.findIndex(usuario => usuario.id === idUsuario)

    usuarios[findIndex].enderecos.splice(posicaoDoEndereco, 1 ,novoEndereco)

    salvar(usuarios)

    /* Essa função nao busca o index do endereço, tem que passa-lo na hora 
    de declarar a função*/

}
// --------- FIM DA FUNÇÃO ALTERAR ENDEREÇO ----------

// --------- FUNÇÃO ADD FORMA DE PAGAMENTO OK ----------
function addFormaDePagamento(novaFormaDePagamento, idUsuario){
     let findIndex = usuarios.findIndex(usuario => usuario.id === idUsuario)

     usuarios[findIndex].formasDePagamento.push(novaFormaDePagamento)

     salvar(usuarios)
}
// --------- FIM DA FUNÇÃO ADD FORMA DE PAGAMENTO ----------

// --------- FUNÇÃO REMOVER FORMA DE PAGAMENTO OK ----------
function removerFormaDePagamento(posicaoDaFormaDePagamento, idUsuario){
    let findIndex = usuarios.findIndex(usuario => usuario.id === idUsuario)

    usuarios[findIndex].formasDePagamento.splice(posicaoDaFormaDePagamento, 1)

    salvar(usuarios)

    
}
// --------- FIM DA FUNÇÃO REMOVER FORMA DE PAGAMENTO ----------

function alterarFormaDePagamento(novaFormaDePagamento, posicaoDaFormaDePagamento, idUsuario){
    let findIndex = usuarios.findIndex(usuario => usuario.id === idUsuario)

    usuarios[findIndex].formasDePagamento.splice(posicaoDaFormaDePagamento, 1, novaFormaDePagamento)

    salvar(usuarios)
}

const UsuariosServices = {
    cadastrar,
    listar,
    salvar,
    detalhar,
    remover,
    alterar,
    addEndereco,
    removerEndereco,
    alteraEndereco: alterarEndereco,
    addFormaDePagamento,
    removerFormaDePagamento,
    alterarFormaDePagamento
}

module.exports = UsuariosServices;