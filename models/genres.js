const mongoose = require("mongoose");

// Create database Schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
    lowercase: true,
  },
});

// Create a database Model from the Schema
const Genres = mongoose.model("Genres", genreSchema);

module.exports = { Genres, genreSchema };
