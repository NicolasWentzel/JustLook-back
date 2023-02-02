const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  subject: String,
  description: String,
});

const Content = mongoose.model("content", contentSchema);

module.exports = Content;
