var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      item: {type: String, unique: true},
      descricao: String,
      barras: String,
      quantidadeEstoque: Number,
      preco: Number,
      precominimo: Number,
      referencia: String,
      marca: String,
      imagensdoitem: [String], 
      parceiro: {type: Schema.Types.ObjectId, ref: 'Parceiro'} 
      , 
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
