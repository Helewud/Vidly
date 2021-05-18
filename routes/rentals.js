const Rentals = require("../models/rentals");
const Customers = require("../models/customers");
const Movies = require("../models/movies");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");

const { validateRental } = require("./joiValidation");

const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-dateOut");
  return res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer profile not found");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie)
    return res.status(404).send("Movie does not exist on the database");

  let stock = movie.numberInStock;
  if (stock < 1) return res.status(400).send("Movie rented out");

  const rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something Failed.");
  }
});
module.exports = router;
