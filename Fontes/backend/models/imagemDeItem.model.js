var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nome: Number,
      descicao: String,
      img: {
        data: Buffer,
        contentType: String,
      },
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
