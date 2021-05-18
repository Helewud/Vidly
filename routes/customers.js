const Customers = require("../models/customers");
const { validateCustomer } = require("./joiValidation");
const express = require("express");

const router = express.Router();

// Get the list of all Customer's Profile
router.get("/", async (req, res) => {
  const customer = await Customers.find().sort("name");
  return res.send(customer);
});

// Get a particular Customer's Profile
router.get("/:id", async (req, res) => {
  const customerProfile = await Customers.findById(req.params.id);

  if (!customerProfile)
    return res.status(404).send("Profile of customer not found");

  return res.send(customerProfile);
});

// Create a Customer's Profile
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newProfile = new Customers({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  newProfile = await newProfile.save();

  return res.send(newProfile);
});

// Update a Customer's Profile
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customerProfile = await Customers.findById(req.params.id);
  if (!customerProfile)
    return res.status(404).send("Profile of customer not found");

  const proo = await Customers.findByIdAndUpdate(req.params.id, {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  return res.send(`Profile updated successfully ${proo}`);
});

// Delete a Customer's Profile
router.delete("/:id", async (req, res) => {
  const deletedProfile = await Customers.findByIdAndDelete(req.params.id);

  return res.send(`Profile Deleted successfully ${deletedProfile}`);
});

module.exports = router;
