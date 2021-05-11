const mongoose = require('mongoose');

const Genres = require("../models/genres");

// Create database Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Genres,
      required: true
  },
  numberInStock: {
      type: Number,
      required: true,
  },
  dailyRentalRate: {
      type: Number,
      required: true
  }
});

// Create a database Model from our Schema
const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;