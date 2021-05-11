const { validateMovie } = require("./joiValidation");
const Movies = require("../models/movies");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movies.find().populate("genre", "name -_id");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movies = await Movies.find();

  const movieProfile = movies
    .find((obj) => obj.title === req.params.id || obj.id === req.params.id)
    .populate("newGenre");

  if (!movieProfile) return res.status(404).send("movie not available");

  return res.send(movieProfile);
});

router.post("/", async (req, res) => {
  const validate = validateMovie(req.body);
  if (validate) return res.status(400).send(validate.details[0].message);

  const movies = await Movies.find();

  const movieProfile = movies.find((obj) => obj.title === req.body.title);

  if (movieProfile)
    return res.status(302).redirect(`/api/movies/${movieProfile.title}`);

  const newMovie = new Movies({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  const result = await newMovie.save();
  return res.send(newMovie);
});

module.exports = router;
