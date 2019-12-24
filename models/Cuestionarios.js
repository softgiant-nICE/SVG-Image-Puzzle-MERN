const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const cuestionariosSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  idImagen: {
    type: Schema.Types.ObjectId,
    ref: "imagenes"
  },
  idTema: {
    type: Schema.Types.ObjectId,
    ref: "temas"
  },
  title: String,
  reactives: [
    {
      id: String,
      objects: [String],
      reactive: String
    }
  ]
});

module.exports = Cuestionarios = mongoose.model(
  "cuestionarios",
  cuestionariosSchema
);
