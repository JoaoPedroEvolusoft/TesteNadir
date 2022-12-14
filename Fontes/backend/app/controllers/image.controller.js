const db = require("../../models");
const ImagemDeItem = db.imagensDeItens;
const path = require('path');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('path: ', path.join(__dirname, `../../uploads/${req.params.id}`));
        cb(null, path.join(__dirname, `../../uploads/${req.params.id}`));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

exports.upload = (req, res) => {
    const id = req.params.id;

    if(fs.existsSync(path.join(__dirname, `../../uploads/${id}`))) {
        console.log('Diretório já existe');
    } else {
        fs.mkdirSync(path.join(__dirname, `../../uploads/${id}`));
        console.log('Diretório criado');
    }

    const upload = multer({ storage: storage }).single('file');
    upload(req, res, err => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ file: req.file });
    });
}

