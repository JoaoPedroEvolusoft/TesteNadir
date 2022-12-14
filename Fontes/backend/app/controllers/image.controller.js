const db = require("../../models");
const ImagemDeItem = db.imagensDeItens;
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('path: ', path.join(__dirname, '../../uploads/'));
        cb('Erro path', path.join(__dirname, '../../uploads/'));
    },
    filename: (req, file, cb) => {
        cb('Erro nome', file.originalname);
    }
});

exports.upload = (req, res) => {
    //console.log("arquivo:" , req.file);
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, err => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ file: req.file });
    });
}

