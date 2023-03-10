const { mongoose, itens } = require("../../models");
const db = require("../../models");
const Item = db.itens;
const Parceiro = db.parceiros;
const Imagensdoitem = db.imagensDeItens;
// const jsonDeItens = require('./itens.json');
const csvToJson = require("convert-csv-to-json");

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
  if (!req.body.parceiro) {
    camposRequeridosEmpty.push("parceiro");
  }
  return camposRequeridosEmpty;
};

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
    res
      .status(400)
      .send({
        message:
          "Campos requeridos (" +
          camposRequeridosEmpty.join(",") +
          ") não podem ser vazios!",
      });
    return;
  }

  // Create a Item
  const item = new Item({
    item: req.body.item ? req.body.item : null,
    descricao: req.body.descricao ? req.body.descricao : null,
    barras: req.body.barras ? req.body.barras : null,
    quantidadeEstoque: req.body.quantidadeEstoque
      ? req.body.quantidadeEstoque
      : null,
    preco: req.body.preco ? req.body.preco : null,
    precominimo: req.body.precominimo ? req.body.precominimo : null,
    referencia: req.body.referencia ? req.body.referencia : null,
    marca: req.body.marca ? req.body.marca : null,
    parceiro: req.body.parceiro ? req.body.parceiro.id : null,
  });

  // Save Item in the database
  item
    .save(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro de servidor ao tentar salvar Item.",
      });
    });
};

// Procura por todas as entidades do tipo Item
exports.findAll = async (req, res) => {
  var condition = {};
  try {
  const descricao = req.query.descricao;
  const parceiro = req.query.marca;
  const pagina = +req.query.page || 1;
  const limite = +req.query.limit || 10;
  const salto = (pagina - 1) * limite;


  console.log(parceiro);

  if (descricao) {
    condition.descricao = { $regex: new RegExp(descricao), $options: "i" };
  }
  if (parceiro) {
    condition.parceiro = { $regex: new RegExp(parceiro), $options: "i" };
  }
  const post = await Item.find(condition).skip(salto).limit(limite).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Algum erro desconhecido ocorreu ao buscar Item.",
    })});;
    // Aqui fazemos a pesquisa no nosso banco e realizamos a paginação.
    // Skip e Limit que estão no chaining do documento são metodos do Mongoose
    res.send(post);
    res.status(200).json({
      status: 'sucesso',
      post,
    });
  } catch (err) {
    // ...error Handling
  }

  // Item.find(condition)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Algum erro desconhecido ocorreu ao buscar Item.",
  //     });
  //   });
};

//Retorna os dados dos itens
exports.findAllInternal = () => {
  // var condition = {};
  Item.find({})
    .then((data) => {
      console.log("teste");
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Busca a entidade Item por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({
            message: "A entidade Item com id " + id + " não encontrada!",
          });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Erro desconhecido ocorreu ao buscar a entidade Item com o id " +
            id +
            ".",
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
    res
      .status(400)
      .send({
        message:
          "Campos requeridos (" +
          camposRequeridosEmpty.join(",") +
          ") não podem ser vazios!",
      });
    return;
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Item com id ${id} não encontrada, por isso não pode ser atualizada!`,
        });
      } else
        res.send({
          message: `A entidade Item com id ${id} foi alterada com sucesso.`,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Erro desconhecido ocorreu ao alterar a entidade Item com o id " +
            id +
            ".",
      });
    });
};

// Remove a entidade Item por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Item com id ${id} não encontrada, por isso não pode ser excluida!`,
        });
      } else {
        res.send({
          message: `A entidade Item com id ${id} foi excluída com sucesso.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Erro desconhecido ocorreu ao excluir a entidade Item com o id " +
            id +
            ".",
      });
    });
};

// Exclui todos os registros da entidade Item
exports.deleteAll = (req, res) => {
  Item.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} ${
          data.deletedCount > 1 ? "Itens" : "Item"
        }  foram excluídas!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Algum erro desconhecido ocorreu ao excluir todas as entidades Item.",
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
    .then((data) => {
      //res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro de servidor ao tentar salvar Item.",
      });
    });

  Item.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Item com id ${id} não encontrada, por isso não pode ser atualizada!`,
        });
      } else {
        data.imagensdoitem.push(imagensdoitem.id);
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Erro desconhecido ocorreu ao alterar a entidade Item com o id " +
            id +
            ".",
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
    const post = await Item.find().skip(salto).limit(limite);
    res.send(post);
    res.status(200).json({
      status: 'sucesso',
      post,
    });
  } catch (err) {
    // ...error Handling
  }
};
exports.exportaJSON = async (req, res) => {
  const fileInputName = "app/controllers/itens.csv";
  const jsonDeItens = csvToJson
    .fieldDelimiter(";")
    .formatValueByType()
    .getJsonFromCsv(fileInputName);

  // const ArrayItens= [];
  jsonDeItens.forEach(async (item) => {
    try {
      const parceiroProcurado = await Parceiro.findOne({
        parceiro: item.parceiro,
      }).exec();

      item.parceiro = parceiroProcurado;

      const novoItem = new Item({
        item: item.item ? item.item : null,
        descricao: item.descricao ? item.descricao : null,
        barras: item.barras ? item.barras : null,
        quantidadeEstoque: item.quantidadeEstoque
          ? item.quantidadeEstoque
          : null,
        preco: item.preco ? item.preco : null,
        precominimo: item.precominimo ? item.precominimo : null,
        referencia: item.referencia ? item.referencia : null,
        marca: item.marca ? item.marca : null,
        parceiro: item.parceiro ? item.parceiro.id : null,
      });

      // console.log(novoItem);
      await novoItem
        .save(novoItem)
        .then(data=>{
          res.send({ message: `Dados inseridos com Sucesso` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Algum erro desconhecido ocorreu ao salvar todas as entidades Parceiro."
          });
        });
    } catch (err) {
      // console.log(err);
    }
  });
  // console.log(jsonDeItens);
  // console.log(ArrayItens);
  // Item.insertMany(jsonDeItens).then(
  //   data=>{
  //     res.send({ message: `Dados inseridos com Sucesso` });
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Algum erro desconhecido ocorreu ao salvar todas as entidades Parceiro."
  //     });
  //   });
};
