var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      codigo: String,
        parceiro: {type: Schema.Types.ObjectId, ref: 'Parceiro'}, 
  item: {
      item: Number,
      descricao: String,
      barras: String,
      quantidadeEstoque: Number,
      preco: Number,
      precominimo: Number,
      referencia: String,
      marca: String,
        imagensdoitem: [ 
          [{type: Schema.Types.ObjectId, ref: 'ImagemDeItem'}] 
        ], 
        fornecedoresdoitem: [ 
          [{type: Schema.Types.ObjectId, ref: 'FornecedorDeItem'}] 
        ], 
  }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const FornecedorDeItem = mongoose.model("fornecedorDeItem", schema);
  return FornecedorDeItem;
};
