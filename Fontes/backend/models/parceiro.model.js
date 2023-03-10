var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      parceiro: {
        type: Number,
        unique: true,
        required: true
    },
      nome: String,
      fantasia: String,
      cpfCnpj: String,
      site: String,
      telefone: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Parceiro = mongoose.model("parceiro", schema);
  return Parceiro;
};
