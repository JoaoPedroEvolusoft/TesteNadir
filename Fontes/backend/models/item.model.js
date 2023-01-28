var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      item: String,
      descricao: String,
      barras: String,
      quantidadeEstoque: Number,
      preco: Number,
      precominimo: Number,
      referencia: String,
      marca: String,
      imagensdoitem: [String], 
      fornecedoresdoitem: String, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Item = mongoose.model("item", schema);
  return Item;
};
