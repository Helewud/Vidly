// database holding the movie genres
const database = require("../database");

const express = require("express");

const router = express.Router();

// get the array of all genre available
router.get("/", (req, res) => {
    res.send(database);
});

module.exports = router;