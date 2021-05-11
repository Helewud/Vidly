// database holding the movie genres
const Genres = require("../models/genres");
const express = require("express");

const router = express.Router();

// get the array of all genre available
router.get("/", (req, res) => {
  async function getHome() {
    const genres = await Genres.find().sort("name");
    res.send(genres);
  }
  getHome();
});

module.exports = router;