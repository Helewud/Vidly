const { validateGenre } = require("./joiValidation");
const Genres = require("../models/genres");
const express = require("express");

const router = express.Router();

// get the a particular movie genre
router.get("/:id", async (req, res) => {
  const genres = await Genres.find();

  const movieGenre = genres.find(
    (obj) => obj.name === req.params.id || obj.id === req.params.id
  );

  if (!movieGenre) return res.status(404).send("Genre of movie not available");

  return res.send(movieGenre);
});

//add a new genre to the catalogue
router.post("/", async (req, res) => {
  const validate = validateGenre(req.body);
  if (validate) return res.status(400).send(validate.details[0].message);

  const genres = await Genres.find();

  const movieGenre = genres.find((obj) => obj.name === req.body.name);

  if (movieGenre)
    return res.status(302).redirect(`/api/genres/${movieGenre.name}`);
  
  let newGenre = new Genres({ name: req.body.name });
  newGenre = await newGenre.save();
  return res.send(newGenre);
});

//edit and change the name of genre
router.put("/:id", async (req, res) => {
  const validate = validateGenre(req.body);
  if (validate) return res.status(400).send(validate.details[0].message);

  const genres = await Genres.find();

  const movieGenre = genres.find(
    (obj) => obj.name === req.params.id || obj.id === req.params.id
  );

  if (!movieGenre) return res.status(404).send("Movie genre not found");

  await Genres.findOneAndUpdate(
    { name: req.params.id },
    { name: req.body.name }
  );

  return res.send(await Genres.find());
});

//delete a movie genre
router.delete("/:id", async (req, res) => {
  const genres = await Genres.findOneAndDelete({ name: req.params.id });

  return res.send(await Genres.find());
});

module.exports = router;
