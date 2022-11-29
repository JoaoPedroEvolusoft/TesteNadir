var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      imagemdeitem: Number,
      descricao: String,
      link: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ImagemDeItem = mongoose.model("imagemDeItem", schema);
  return ImagemDeItem;
};
