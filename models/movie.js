const mongoose = require("mongoose");

// Create database Schema
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
});

// Create a database Model from our Schema
const Genres = mongoose.model("Genres", movieSchema);

module.exports = Genres;