const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("files", FileSchema);
