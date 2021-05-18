const bcrypt = require("bcrypt");
const Users = require("../models/users");
const { validateUser } = require("./joiValidation");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userProfile = await Users.findOne({ email: req.body.email });
  if (userProfile)
    return res
      .status(400)
      .send("There's an account associated with the email already");

  userProfile = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userProfile.password, salt);

  userProfile.password = hash;

  await userProfile.save();

  const result = {
    id: userProfile._id,
    name: userProfile.name,
    email: userProfile.email,
  };
  return res.send(result);
});

module.exports = router;
