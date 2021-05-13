const mongoose = require("mongoose");

const rentalCustomer = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 11,
    maxlength: 13,
  },
});

const movieRental = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const rentalSchema = new mongoose.Schema({
  customer: {
    type: rentalCustomer,
    required: true,
  },
  movie: {
    type: movieRental,
    required: true,
  },
  dateOut: {
    type: Date,
    require: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rentals = mongoose.model("Rentals", rentalSchema);

module.exports = Rentals;
