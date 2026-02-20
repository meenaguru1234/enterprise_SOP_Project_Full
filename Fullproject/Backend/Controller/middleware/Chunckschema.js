const mongoose = require("mongoose");

const ChunkSchema = new mongoose.Schema({
  fileId: String,
  text: String
});

module.exports = mongoose.model("chunks", ChunkSchema);
