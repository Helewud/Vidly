const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
Joi.objectId = require("joi-objectid")(Joi);

// Validate users input for Genre using Joi
function validateGenre(req) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return ({ error, value } = schema.validate(req));
}

// Validate users input for Customer using Joi
function validateCustomer(req) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required(),
    phone: Joi.number().required(),
  });
  return ({ error, value } = schema.validate(req));
}

// Validate users input for Movie using Joi
function validateMovie(req) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.objecdtId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  return ({ error, value } = schema.validate(req));
}

// Validate users input for Movie using Joi
function validateRental(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return ({ error, value } = schema.validate(req));
}

// Validate users input for User's Profile Creation using Joi
function validateUser(req) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(255),
    email: Joi.string().required().min(5).max(255).email(),
    password: passwordComplexity(),
  });
  return ({ error, value } = schema.validate(req));
}

// Validate users input for User's login auth
function validateAuth(req) {
  const options = {
    min: 8,
    max: 255,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: passwordComplexity(options, "Password"),
  });
  return ({ error, value } = schema.validate(req));
}

module.exports = {
  validateGenre,
  validateCustomer,
  validateMovie,
  validateRental,
  validateUser,
  validateAuth,
};
