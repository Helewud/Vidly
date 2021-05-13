const mongoose = require("mongoose");

// Create customer Schema
const customerSchema = new mongoose.Schema({
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

// Create a database Model from our Schema
const Customers = mongoose.model("Customers", customerSchema);

module.exports = Customers;
