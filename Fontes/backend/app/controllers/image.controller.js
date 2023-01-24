const db = require("../../models");
const ImagemDeItem = db.imagensDeItens;
const path = require('path');
const fs = require('fs');

const multer = require('multer');

var filename = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../../uploads/${req.params.id}`));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        filename = file.originalname;
    }
});

function upload(req, res){
    const id = req.params.id;

    if(!fs.existsSync(path.join(__dirname, `../../uploads/${id}`))) {
        fs.mkdirSync(path.join(__dirname, `../../uploads/${id}`));
    }
    
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, err => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        //res.json({ file: req.file });
    });
}

exports.save = async (req, res) => {
    await upload(req, res);
    const id = req.params.id;

    const newImage = new ImagemDeItem({
        nome: req.body.nome,
        descricao: req.body.descricao, 
        img: {
            data: fs.readFileSync(path.join(__dirname, `../../uploads/${id}/${filename}`)),
            contentType: "image/jpg",
        }
    });
    newImage.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro ocorreu ao salvar a imagem."
            });
        });
};



exports.findAll = async (req, res) => {
    const allData = await ImagemDeItem.find();
    res.json(allData);
}

exports.findById = async (req, res) => {
    const id = req.params.id;

    const data = await ImagemDeItem
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Não foi encontrado imagem com id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao recuperar imagem com id=" + id });
        });    
}