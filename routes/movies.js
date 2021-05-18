const mongoose = require("mongoose");
const { validateMovie } = require("./joiValidation");
const Movies = require("../models/movies");
const { Genres } = require("../models/genres");
const express = require("express");

const router = express.Router();

// Get the list of all movies
router.get("/", async (req, res) => {
  const movies = await Movies.find().sort("name");
  res.send(movies);
});

// Get a particular movie
router.get("/:id", async (req, res) => {
  const movies = await Movies.find();

  const movieProfile = movies.find(
    (obj) => obj.title === req.params.id || obj.id === req.params.id
  );

  if (!movieProfile) return res.status(404).send("movie not available");

  return res.send(movieProfile);
});

// Add a new movie to the list of movies
router.post("/", async (req, res) => {
  // Validate the req by the user using Joi
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the genre of the movie using genre
  const genres = await Genres.findById(req.body.genreId);
  if (!genres) return res.status(404).send("Genre of movie not available");

  // create a new movie instance using Movie model
  const newMovie = new Movies({
    title: req.body.title,
    genre: {
      _id: genres._id,
      name: genres.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  // Adding the movie to database
  await newMovie.save();
  return res.send(newMovie);
});
module.exports = router;
