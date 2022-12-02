var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      codigo: String,
        parceiro: {type: Schema.Types.ObjectId, ref: 'Parceiro'}, 
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
