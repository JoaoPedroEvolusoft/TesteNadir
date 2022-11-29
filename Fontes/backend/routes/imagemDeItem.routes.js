module.exports = app => {
    const imagensDeItens = require("../app/controllers/imagemDeItem.controller.js"); 
    var router = require("express").Router(); 
    // Create a new ImagemDeItem 
    router.post("/", imagensDeItens.create); 
    // Retrieve all imagensDeItens 
    router.get("/", imagensDeItens.findAll); 
    // Retrieve a single ImagemDeItem with id 
    router.get("/:id", imagensDeItens.findOne); 
    // Update a ImagemDeItem with id 
    router.put("/:id", imagensDeItens.update); 
    // Delete a ImagemDeItem with id 
    router.delete("/:id", imagensDeItens.delete); 
    // Create a new ImagemDeItem 
    router.delete("/", imagensDeItens.deleteAll); 
    app.use('/api/imagensDeItens', router); 
  }; 
