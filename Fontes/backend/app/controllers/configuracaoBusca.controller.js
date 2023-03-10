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
    if (!req.body.caminhoImagem) {
      camposRequeridosEmpty.push("caminhoImagem");
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
        parceiro: req.body.parceiro ? req.body.parceiro: null,
        urlbusca: req.body.urlbusca ? req.body.urlbusca : null,
        variaveis: req.body.variaveis ? req.body.variaveis : null,
        caminhoImagem: req.body.caminhoImagem ? req.body.caminhoImagem: null,
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
    if (!req.params.id) {
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

exports.getAllPosts = async (req, res) => {
  try {
    // Aqui pegamos pelos query params a página que queremos e como query params
    // vêm em string convertemos para números e caso seja vazio estamos settando para 1
    const pagina = +req.query.page || 1;

    // Aqui estamos pegando o limite informado pelos query params e 
    // convertendo para número caso seja vazio settamos para 10 

    const limite = +req.query.limit || 10;

    // Aqui rola um cálculo maroto, onde subtraimos para pegarmos a página anterior e multiplicamos pelo limite
    // para termos o salto desejado;

    const salto = (pagina - 1) * limite;

    // Aqui fazemos a pesquisa no nosso banco e realizamos a paginação.
    // Skip e Limit que estão no chaining do documento são metodos do Mongoose
    const post = await ConfiguracaoBusca.find().skip(salto).limit(limite);
    res.send(post);
    res.status(200).json({
      status: 'sucesso',
      post,
    });
  } catch (err) {
    // ...error Handling
  }
};