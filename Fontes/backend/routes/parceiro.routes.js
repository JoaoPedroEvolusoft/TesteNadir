module.exports = app => {
    const parceiros = require("../app/controllers/parceiro.controller.js"); 
    var router = require("express").Router(); 
    // Create a new Parceiro 
    router.post("/", parceiros.create); 
    //Create todos os parceiros do JSON
    router.post("/json", parceiros.exportaJSON); 
    // Retrieve all parceiros 
    router.get("/", parceiros.findAll); 
    // Retrieve a single Parceiro with id 
    router.get("/:id", parceiros.findOne); 
    // Update a Parceiro with id 
    router.put("/:id", parceiros.update); 
    // Delete a Parceiro with id 
    router.delete("/:id", parceiros.delete); 
    // Create a new Parceiro 
    router.delete("/", parceiros.deleteAll); 
    app.use('/api/parceiros', router); 
  }; 
