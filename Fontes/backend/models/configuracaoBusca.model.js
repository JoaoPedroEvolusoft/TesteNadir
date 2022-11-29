var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      codigo: Number,
      descricao: String,
        parceiro: {type: Schema.Types.ObjectId, ref: 'Parceiro'}, 
      urlbusca: String,
        variaveis: [ 
          [{type: Schema.Types.ObjectId, ref: 'Variavel'}] 
        ], 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ConfiguracaoBusca = mongoose.model("configuracaoBusca", schema);
  return ConfiguracaoBusca;
};
