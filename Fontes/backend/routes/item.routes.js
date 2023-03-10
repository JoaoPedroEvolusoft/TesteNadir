module.exports = app => {
    const itens = require("../app/controllers/item.controller.js"); 
    var router = require("express").Router(); 
    // Create a new Item 
    router.post("/", itens.create); 
    // Create todos os itens do JSON
    router.post("/json",itens.exportaJSON);
    //fazerPaginacao
    router.get("/paginacao", itens.getAllPosts);
    // Retrieve all itens 
    router.get("/", itens.findAll); 
    // Retrieve a single Item with id 
    router.get("/:id", itens.findOne); 
    // Update a Item with id 
    router.put("/:id", itens.update); 
    // Delete a Item with id 
    router.delete("/:id", itens.delete); 
    // Create a new Item 
    router.delete("/", itens.deleteAll); 
    // Create a new image
    router.post("/:id", itens.createImage);

    app.use('/api/itens', router); 
  }; 
