const db = require("../../models");
const Item = db.itens;
const Imagensdoitem = db.imagensDeItens;

validaCamposRequeridosItem = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.item) {
        camposRequeridosEmpty.push("item");
    }
    if (!req.body.descricao) {
        camposRequeridosEmpty.push("descricao");
    }
    if (!req.body.barras) {
        camposRequeridosEmpty.push("barras");
    }
    if (!req.body.quantidadeEstoque) {
        camposRequeridosEmpty.push("quantidadeEstoque");
    }
    if (!req.body.preco) {
        camposRequeridosEmpty.push("preco");
    }
    if (!req.body.precominimo) {
        camposRequeridosEmpty.push("precominimo");
    }
    if (!req.body.referencia) {
        camposRequeridosEmpty.push("referencia");
    }
    if (!req.body.marca) {
        camposRequeridosEmpty.push("marca");
    }
    if (!req.body.imagensdoitem) {
        camposRequeridosEmpty.push("imagensdoitem");
    }
    /*if (!req.body.fornecedoresdoitem) {
        camposRequeridosEmpty.push("fornecedoresdoitem");
    }*/
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.item) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosItem(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Item
    const item = new Item({
        item: req.body.item ? req.body.item : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        barras: req.body.barras ? req.body.barras : null,
        quantidadeEstoque: req.body.quantidadeEstoque ? req.body.quantidadeEstoque : null,
        preco: req.body.preco ? req.body.preco : null,
        precominimo: req.body.precominimo ? req.body.precominimo : null,
        referencia: req.body.referencia ? req.body.referencia : null,
        marca: req.body.marca ? req.body.marca : null,
    });

    // Save Item in the database
    item
        .save(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Item."
            });
        });
};

// Procura por todas as entidades do tipo Item
exports.findAll = (req, res) => {
    var condition = {};

    const descricao = req.query.descricao;
    if (descricao) {
        condition.descricao = { $regex: new RegExp(descricao), $options: "i" };
    }

    Item.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Item."
        });
      });
};

// Busca a entidade Item por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Item.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Item com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Item com o id " + id + "."
        });
      });
};

// Altera uma entidade Item
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosItem(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Item com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Item com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Item com o id " + id + "."
        });
      });
};

// Remove a entidade Item por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    Item.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Item com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Item com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Item com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Item
exports.deleteAll = (req, res) => {

    Item.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'Itens' : 'Item'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Item."
        });
      });
};

exports.createImage = (req, res) => {
    const id = req.params.id;

    const imagensdoitem = new Imagensdoitem({
      imagemdeitem: req.body.imagemdeitem ? req.body.imagemdeitem : null,
      descricao: req.body.descricao ? req.body.descricao : null,
      link: req.body.link ? req.body.link : null,
  });

  // Save Item in the database
  imagensdoitem
      .save(imagensdoitem)
      .then(data => {
          //res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
              err.message || "Ocorreu um erro de servidor ao tentar salvar Item."
          });
      });


   Item
       .findById(id)
       .then(data => {
           if (!data) {
               res.status(404).send({
                   message: `A entidade Item com id ${id} não encontrada, por isso não pode ser atualizada!`
               });
           } else {
                data.imagensdoitem.push(imagensdoitem.id);
                res.send(data);
           }
         })
       .catch(err => {
           res.status(500).send({
               message:
                   err.message || "Erro desconhecido ocorreu ao alterar a entidade Item com o id " + id + "."
           });
       });      
};