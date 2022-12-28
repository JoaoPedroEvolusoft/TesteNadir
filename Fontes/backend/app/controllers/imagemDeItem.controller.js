const db = require("../../models");
const ImagemDeItem = db.imagensDeItens;

validaCamposRequeridosImagemDeItem = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.imagemdeitem) {
        camposRequeridosEmpty.push("imagemdeitem");
    }
    if (!req.body.descricao) {
        camposRequeridosEmpty.push("descricao");
    }
    if (!req.body.link) {
        camposRequeridosEmpty.push("link");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade ImagemDeItem
exports.create = (req, res) => {
    // Validate request
    if (!req.body.imagemdeitem) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosImagemDeItem(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a ImagemDeItem
    const imagemDeItem = new ImagemDeItem({
        imagemdeitem: req.body.imagemdeitem ? req.body.imagemdeitem : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        link: req.body.link ? req.body.link : null,
    });

    // Save ImagemDeItem in the database
    imagemDeItem
        .save(imagemDeItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar ImagemDeItem."
            });
        });
};

// Procura por todas as entidades do tipo ImagemDeItem
exports.findAll = (req, res) => {
    var condition = {};

    const descricao = req.query.descricao;
    if (descricao) {
        condition.descricao = { $regex: new RegExp(descricao), $options: "i" };
    }

    ImagemDeItem.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar ImagemDeItem."
        });
      });
};

// Busca a entidade ImagemDeItem por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    ImagemDeItem.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade ImagemDeItem com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade ImagemDeItem com o id " + id + "."
        });
      });
};

// Altera uma entidade ImagemDeItem
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosImagemDeItem(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    ImagemDeItem.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ImagemDeItem com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade ImagemDeItem com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade ImagemDeItem com o id " + id + "."
        });
      });
};

// Remove a entidade ImagemDeItem por id
exports.delete = (req, res) => {
    const id = req.params.id;

    ImagemDeItem.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ImagemDeItem com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade ImagemDeItem com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade ImagemDeItem com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade ImagemDeItem
exports.deleteAll = (req, res) => {

    ImagemDeItem.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'ImagensDeItens' : 'ImagemDeItem'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades ImagemDeItem."
        });
      });
};
