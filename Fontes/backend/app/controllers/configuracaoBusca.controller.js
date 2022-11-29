const db = require("../../models");
const ConfiguracaoBusca = db.configuracoesBuscas;

validaCamposRequeridosConfiguracaoBusca = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.codigo) {
        camposRequeridosEmpty.push("codigo");
    }
    if (!req.body.descricao) {
        camposRequeridosEmpty.push("descricao");
    }
    if (!req.body.parceiro) {
        camposRequeridosEmpty.push("parceiro");
    }
    if (!req.body.urlbusca) {
        camposRequeridosEmpty.push("urlbusca");
    }
    if (!req.body.variaveis) {
        camposRequeridosEmpty.push("variaveis");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade ConfiguracaoBusca
exports.create = (req, res) => {
    // Validate request
    if (!req.body.codigo) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosConfiguracaoBusca(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a ConfiguracaoBusca
    const configuracaoBusca = new ConfiguracaoBusca({
        codigo: req.body.codigo ? req.body.codigo : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        parceiro: req.body.parceiro ? req.body.parceiro.id : null,
        urlbusca: req.body.urlbusca ? req.body.urlbusca : null,
    });

    // Save ConfiguracaoBusca in the database
    configuracaoBusca
        .save(configuracaoBusca)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar ConfiguracaoBusca."
            });
        });
};

// Procura por todas as entidades do tipo ConfiguracaoBusca
exports.findAll = (req, res) => {
    var condition = {};

    const descricao = req.query.descricao;
    if (descricao) {
        condition.descricao = { $regex: new RegExp(descricao), $options: "i" };
    }

    ConfiguracaoBusca.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar ConfiguracaoBusca."
        });
      });
};

// Busca a entidade ConfiguracaoBusca por id
exports.findOne = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    ConfiguracaoBusca.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade ConfiguracaoBusca com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade ConfiguracaoBusca com o id " + id + "."
        });
      });
};

// Altera uma entidade ConfiguracaoBusca
exports.update = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosConfiguracaoBusca(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    ConfiguracaoBusca.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ConfiguracaoBusca com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade ConfiguracaoBusca com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade ConfiguracaoBusca com o id " + id + "."
        });
      });
};

// Remove a entidade ConfiguracaoBusca por id
exports.delete = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    const id = req.params.id;

    ConfiguracaoBusca.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ConfiguracaoBusca com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade ConfiguracaoBusca com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade ConfiguracaoBusca com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade ConfiguracaoBusca
exports.deleteAll = (req, res) => {

    ConfiguracaoBusca.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? 'ConfiguracoesBuscas' : 'ConfiguracaoBusca'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades ConfiguracaoBusca."
        });
      });
};
