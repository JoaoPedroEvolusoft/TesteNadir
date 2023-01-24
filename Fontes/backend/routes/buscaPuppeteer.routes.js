module.exports = app => {
    const buscaPuppeteer = require("../app/controllers/buscaPuppeteer.controller"); 
    var router = require("express").Router();
     
    // Create a new BuscaPuppeteer 
    router.post("/", buscaPuppeteer.create); 

    app.use('/api/buscaPuppeteer', router); 
  }; 
