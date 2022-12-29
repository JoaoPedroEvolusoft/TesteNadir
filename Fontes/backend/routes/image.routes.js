module.exports = app => {
    const multer = require('multer');
    const image = require("../app/controllers/image.controller.js"); 
    var router = require("express").Router(); 

    router.post("/:id", image.save); 

    router.get("/", image.findAll);

    router.get("/:id", image.findById);

    app.use('/api/image', router); 
  }; 
