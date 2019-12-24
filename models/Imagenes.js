const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const imagenesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: String,
  website: String,
  description: String,
  imageSVG: String,
  objects: [
    {
      idObject: String,
      tag: String
    }
  ]
});

module.exports = Imagenes = mongoose.model("imagenes", imagenesSchema);
