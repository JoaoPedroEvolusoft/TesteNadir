var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      codigo: Number,
      descricao: String,
      parceiro: String, 
      urlbusca: String,
      variaveis: String,
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
