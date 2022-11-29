module.exports = app => {
    const fornecedoresDeItens = require("../app/controllers/fornecedorDeItem.controller.js"); 
    var router = require("express").Router(); 
    // Create a new FornecedorDeItem 
    router.post("/", fornecedoresDeItens.create); 
    // Retrieve all fornecedoresDeItens 
    router.get("/", fornecedoresDeItens.findAll); 
    // Retrieve a single FornecedorDeItem with id 
    router.get("/:id", fornecedoresDeItens.findOne); 
    // Update a FornecedorDeItem with id 
    router.put("/:id", fornecedoresDeItens.update); 
    // Delete a FornecedorDeItem with id 
    router.delete("/:id", fornecedoresDeItens.delete); 
    // Create a new FornecedorDeItem 
    router.delete("/", fornecedoresDeItens.deleteAll); 
    app.use('/api/fornecedoresDeItens', router); 
  }; 
