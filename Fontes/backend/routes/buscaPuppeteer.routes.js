module.exports = app => {
    const buscaPuppeteer = require("../app/controllers/buscaPuppeteer.controller"); 
    var router = require("express").Router();
     
    // Create a new BuscaPuppeteer 
    router.post("/", buscaPuppeteer.start); 

    app.use('/api/buscaPuppeteer', router); 
  }; 
