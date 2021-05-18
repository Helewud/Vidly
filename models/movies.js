const mongoose = require("mongoose");

const { genreSchema } = require("../models/genres");

// Create database Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

// Create a database Model from the Schema
const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
