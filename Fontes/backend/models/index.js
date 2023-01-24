const mongoose = require("mongoose"); 
mongoose.Promise = global.Promise; 
const db = {}; 
db.mongoose = mongoose;

//Declara Item
db.itens = require("./item.model.js")(mongoose); 

//Declara ImagemDeItem
db.imagensDeItens = require("./imagemDeItem.model.js")(mongoose); 

//Declara FornecedorDeItem
db.fornecedoresDeItens = require("./fornecedorDeItem.model.js")(mongoose); 

//Declara Parceiro
db.parceiros = require("./parceiro.model.js")(mongoose); 

//Declara ConfiguracaoBusca
db.configuracoesBuscas = require("./configuracaoBusca.model.js")(mongoose); 

//Declara Variavel
db.variaveis = require("./variavel.model.js")(mongoose); 


module.exports = db;
