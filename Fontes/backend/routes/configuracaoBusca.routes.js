module.exports = app => {
    const configuracoesBuscas = require("../app/controllers/configuracaoBusca.controller.js"); 
    var router = require("express").Router(); 
    // Create a new ConfiguracaoBusca 
    router.post("/", configuracoesBuscas.create); 
    // Retrieve all configuracoesBuscas 
    router.get("/", configuracoesBuscas.findAll); 
    // Retrieve a single ConfiguracaoBusca with id 
    router.get("/:id", configuracoesBuscas.findOne); 
    // Update a ConfiguracaoBusca with id 
    router.put("/:id", configuracoesBuscas.update); 
    // Delete a ConfiguracaoBusca with id 
    router.delete("/:id", configuracoesBuscas.delete); 
    // Create a new ConfiguracaoBusca 
    router.delete("/", configuracoesBuscas.deleteAll); 
    app.use('/api/configuracoesBuscas', router); 
  }; 
