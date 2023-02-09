module.exports = app => {
    const configuracoesBuscas = require("../app/controllers/configuracaoBusca.controller.js"); 
    const buscaPuppeteer = require("../app/controllers/buscaPuppeteer.controller");
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
    // puppetear buscas
    router.post("/puppeteer", buscaPuppeteer.start);

    //puppeteer buscas com itens
    router.post("/puppeteer/a", buscaPuppeteer.start2);

    router.post("/puppeteer/b", buscaPuppeteer.start3);
    
    app.use('/api/configuracoesBuscas', router); 
  }; 
