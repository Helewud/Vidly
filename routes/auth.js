const { validateAuth } = require("./joiValidation");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not registered");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, "callmedaddy");

  res.send(token);
});

module.exports = router;
