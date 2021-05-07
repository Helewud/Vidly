// database holding the movie genres
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

// Create database Schema
const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
});

const Genres = mongoose.model("Genres", movieSchema);

const Joi = require("joi");
const express = require("express");

const router = express.Router();

//function to validate users input using Joi
function validateInput(item) {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error, value } = schema.validate(item);
  return error;
};


// get the a particular movie genre
router.get("/:id", (req, res) => {
  async function getGenre() {
    const genres = await Genres.find();

    const movieGenre = genres.find((obj) => obj.id === req.params.id);

    if (!movieGenre)
      return res.status(404).send("Genre of movie not available");

    res.send(movieGenre);
  }
  getGenre();
});


//add a new genre to the catalogue
router.post("/", (req, res) => {
  const validate = validateInput(req.body);
  if (validate) return res.status(400).send(validate.details[0].message);

  async function createGenres() {
    const genres = await Genres.find();

    const movieGenre = genres.find((obj) => obj.id === req.body.id);

    if (movieGenre)
      return res.status(302).redirect(`/api/genres/${movieGenre.id}`);

    const newGenre = new Genres({
      id: req.body.id,
    });
    const result = await newGenre.save();
    return res.send(result);
  }
  createGenres();
});


//edit and change the name of genre
router.put("/:id", (req, res) => {
    const validate = validateInput(req.body);
    if (validate) return res.status(400).send(validate.details[0].message);

    async function updateGenre() {

        const genres = await Genres.find();

        const movieGenre = genres.find((obj) => obj.id === req.params.id);

        if (!movieGenre) return res.status(404).send("Movie genre not found");

        movieGenre.id = req.body.id;

        const result = await movieGenre.save();
        return res.send(result);
    };
    updateGenre();
});


//delete a movie genre
router.delete("/:id", (req, res) => {

    async function deleteGenre() {
      const genres = await Genres.find();

      const movieGenre = genres.find((obj) => obj.id === req.params.id);

      const index = await Genres.deleteOne(movieGenre);

      res.send(await Genres.find());
    }
    deleteGenre();

});


module.exports = router;
