// database holding the movie genres
const database = require("../database");

const Joi = require("joi");
const express = require("express");

const router = express.Router();

//function to validate users input using Joi
function validateInput(item) {

    const schema = Joi.object({
        id: Joi.string().required()
    });
    const {
        error,
        value
    } = schema.validate(item);
    return error;

}

// get the a particular movie genre
router.get("/:id", (req, res) => {
    const movieGenre = database.find((movie) => movie.id === req.params.id);

    if (!movieGenre) return res.status(404).send("Genre of movie not available");

    res.send(movieGenre.id);
});

//add a new genre to the catalogue
router.post("/", (req, res) => {

    const validate = validateInput(req.body);
    if (validate) return res.status(400).send(validate.details[0].message);

    const movieGenre = database.find((movie) => movie.id === req.body.id);

    if (movieGenre) {
        res.status(302).redirect(`/api/genres/${movieGenre.id}`);
    } else {
        const newGenre = {
            id: req.body.id
        };
        database.push(newGenre);
        return res.send(newGenre);
    }
});

//edit and change the name of genre
router.put("/:id", (req, res) => {

    const validate = validateInput(req.body);
    if (validate) return res.status(400).send(validate.details[0].message);

    const movieGenre = database.find((movie) => movie.id === req.params.id);

    if (!movieGenre) return res.status(404).send("Movie genre not found");

    movieGenre.id = req.body.id;

    res.send(movieGenre);
});

//delete a movie genre
router.delete("/:id", (req, res) => {

    const movieGenre = database.find((movie) => movie.id === req.params.id);

    if (!movieGenre) return res.status(404).send("Movie genre not found");

    const index = database.indexOf(movieGenre);

    database.splice(index, 1);

    res.send(database);
});

module.exports = router;