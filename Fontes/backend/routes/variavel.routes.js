module.exports = app => {
    const variaveis = require("../app/controllers/variavel.controller.js"); 
    var router = require("express").Router(); 
    // Create a new Variavel 
    router.post("/", variaveis.create); 
    // Retrieve all variaveis 
    router.get("/", variaveis.findAll); 
    // Retrieve a single Variavel with id 
    router.get("/:id", variaveis.findOne); 
    // Update a Variavel with id 
    router.put("/:id", variaveis.update); 
    // Delete a Variavel with id 
    router.delete("/:id", variaveis.delete); 
    // Create a new Variavel 
    router.delete("/", variaveis.deleteAll); 
    app.use('/api/variaveis', router); 
  }; 
