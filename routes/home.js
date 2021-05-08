// database holding the movie genres
const Genres = require("./mongoose");
const express = require("express");

const router = express.Router();

// get the array of all genre available
router.get("/", (req, res) => {
  async function getHome() {
    const genres = await Genres.find();
    res.send(genres);
  }
  getHome();
});

module.exports = router;
