const express = require("express");
const Rentals = require("../models/rentals");
const Customers = require("../models/customers");
const Movies = require("../models/movies");

const { validateRental } = require("./joiValidation");

const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-dateOut");
  return res.send(rentals);
});

router.post("/", async (req, res) => {
  const validate = validateRental(req.body);
  if (validate) return res.status(400).send(validate.details[0].message);

  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer profile not found");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie)
    return res.status(404).send("Movie does not exist on the database");

  const rentals = new Rentals({
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

  await rentals.save();

  movie.numberInStock--;

  movie.save();
  return res.send(rentals);
});

module.exports = router;
