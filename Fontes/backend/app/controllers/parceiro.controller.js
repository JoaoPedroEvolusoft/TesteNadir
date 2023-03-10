const db = require("../../models");
const { create } = require("./item.controller");
const Parceiro = db.parceiros;
const csvToJson = require('convert-csv-to-json');
const fs = require("fs");

validaCamposRequeridosParceiro = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.parceiro) {
        camposRequeridosEmpty.push("parceiro");
    }
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    if (!req.body.fantasia) {
        camposRequeridosEmpty.push("fantasia");
    }
    if (!req.body.cpfCnpj) {
        camposRequeridosEmpty.push("cpfCnpj");
    }
    if (!req.body.site) {
        camposRequeridosEmpty.push("site");
    }
    if (!req.body.telefone) {
        camposRequeridosEmpty.push("telefone");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Parceiro
exports.create = (req, res) => {
    // Validate request
    if (!req.body.parceiro) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosParceiro(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Parceiro
    const parceiro = new Parceiro({
        parceiro: req.body.parceiro ? req.body.parceiro : null,
        nome: req.body.nome ? req.body.nome : null,
        fantasia: req.body.fantasia ? req.body.fantasia : null,
        cpfCnpj: req.body.cpfCnpj ? req.body.cpfCnpj : null,
        site: req.body.site ? req.body.site : null,
        telefone: req.body.telefone ? req.body.telefone : null,
    });

    // Save Parceiro in the database
    parceiro
        .save(parceiro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Parceiro."
            });
        });
};

// Procura por todas as entidades do tipo Parceiro
exports.findAll = (req, res) => {
    var condition = {};

    const nome = req.query.nome;
    if (nome) {
        condition.nome = { $regex: new RegExp(nome), $options: "i" };
    }

    Parceiro.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Parceiro."
        });
      });
};

// Busca a entidade Parceiro por id
exports.findOne = (req, res) => {
    // Validate request
    const id = req.params.id;

    Parceiro.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Parceiro com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Parceiro com o id " + id + "."
        });
      });
};

// Altera uma entidade Parceiro
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosParceiro(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Parceiro.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Parceiro com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Parceiro com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Parceiro com o id " + id + "."
        });
      });
};

// Remove a entidade Parceiro por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Parceiro.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Parceiro com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Parceiro com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Parceiro com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Parceiro
exports.deleteAll = (req, res) => {

    Parceiro.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'Parceiros' : 'Parceiro'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Parceiro."
        });
      });
};

exports.exportaJSON = (req,res) => {
  const fileInputName = "app/controllers/parceiros.csv"
  const jsonDeParceiros = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileInputName);


   Parceiro.insertMany(jsonDeParceiros).then(
      data=>{
        res.send({ message: `Dados inseridos com Sucesso` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao salvar todas as entidades Parceiro."
        });
      });
};