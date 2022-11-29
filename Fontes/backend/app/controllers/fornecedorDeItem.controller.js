const db = require("../../models");
const FornecedorDeItem = db.fornecedoresDeItens;

validaCamposRequeridosFornecedorDeItem = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.codigo) {
        camposRequeridosEmpty.push("codigo");
    }
    if (!req.body.parceiro) {
        camposRequeridosEmpty.push("parceiro");
    }
    if (!req.body.item) {
        camposRequeridosEmpty.push("item");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade FornecedorDeItem
exports.create = (req, res) => {
    // Validate request
    if (!req.body.codigo) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosFornecedorDeItem(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a FornecedorDeItem
    const fornecedorDeItem = new FornecedorDeItem({
        codigo: req.body.codigo ? req.body.codigo : null,
        parceiro: req.body.parceiro ? req.body.parceiro.id : null,
    });

    // Save FornecedorDeItem in the database
    fornecedorDeItem
        .save(fornecedorDeItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar FornecedorDeItem."
            });
        });
};

// Procura por todas as entidades do tipo FornecedorDeItem
exports.findAll = (req, res) => {
    var condition = {};

    const codigo = req.query.codigo;
    if (codigo) {
        condition.codigo = { $regex: new RegExp(codigo), $options: "i" };
    }

    FornecedorDeItem.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar FornecedorDeItem."
        });
      });
};

// Busca a entidade FornecedorDeItem por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    FornecedorDeItem.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade FornecedorDeItem com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade FornecedorDeItem com o id " + id + "."
        });
      });
};

// Altera uma entidade FornecedorDeItem
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosFornecedorDeItem(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    FornecedorDeItem.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade FornecedorDeItem com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade FornecedorDeItem com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade FornecedorDeItem com o id " + id + "."
        });
      });
};

// Remove a entidade FornecedorDeItem por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    FornecedorDeItem.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade FornecedorDeItem com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade FornecedorDeItem com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade FornecedorDeItem com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade FornecedorDeItem
exports.deleteAll = (req, res) => {

    FornecedorDeItem.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'FornecedoresDeItens' : 'FornecedorDeItem'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades FornecedorDeItem."
        });
      });
};
