module.exports = app => {
    const image = require("../app/controllers/image.controller.js"); 
    var router = require("express").Router(); 
    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log(file);
          cb('Erro path', path.join(__dirname, '../uploads/'));
      },
      filename: (req, file, cb) => {
        console.log('file: ', file.originalname)
          cb('Erro nome', file.originalname);
      }
  });

  const upload = multer({ storage: storage });

    router.post("/", upload.single('file'), image.upload); 

    app.use('/api/image', router); 
  }; 
