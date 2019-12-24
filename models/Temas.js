const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const temasSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: String,
  grade: String,
  website: String,
  description: String,
  resume: String,
  topics: {
    type: [String],
    required: true
  }
});

module.exports = Temas = mongoose.model("temas", temasSchema);
