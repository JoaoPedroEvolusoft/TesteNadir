const express = require("express");
const cors = require("cors"); 
const app = express();
const multer = require('multer');
const path = require('path');


(async() => {
var corsOptions = { 
  origin: "http://localhost:8081" 
}; 

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.a3mav.mongodb.net/curso-javascript?retryWrites=true&w=majority');
        // mongodb+srv://jvpiloni:Pl1oIS0yn5GpERtj@cluster0.cgvp8s3.mongodb.net/?retryWrites=true&w=majority'

// simple route
app.get("/", (req, res) => { 
  res.json({ message: "Welcome to application." }); 
}); 

//Declara Item rotas
require("./routes/item.routes")(app); 

//Declara ImagemDeItem rotas
require("./routes/imagemDeItem.routes")(app); 

//Declara FornecedorDeItem rotas
require("./routes/fornecedorDeItem.routes")(app); 

//Declara Parceiro rotas
require("./routes/parceiro.routes")(app); 

//Declara ConfiguracaoBusca rotas
require("./routes/configuracaoBusca.routes")(app); 

//Declara Variavel rotas
require("./routes/variavel.routes")(app); 

//Declara imagens rotas
require("./routes/image.routes.js")(app); 

//Declara ObterProdutos rotas
// require("./routes/buscaPuppeteer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
})();