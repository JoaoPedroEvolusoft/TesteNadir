var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      item: Number,
      descricao: String,
      barras: String,
      quantidadeEstoque: Number,
      preco: Number,
      precominimo: Number,
      referencia: String,
      marca: String,
      imagensdoitem: String,
      imagensdoitem2: String,
        fornecedoresdoitem: [ 
          [{type: Schema.Types.ObjectId, ref: 'FornecedorDeItem'}] 
        ], 
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
