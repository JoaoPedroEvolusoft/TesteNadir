module.exports = app => {
    const image = require("../app/controllers/image.controller.js"); 
    var router = require("express").Router(); 
    const multer = require('multer');
    const path = require('path');

    router.post("/:id", image.upload); 

    app.use('/api/image', router); 
  }; 
