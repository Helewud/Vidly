const Joi = require("joi");

// Validate users input for Genre using Joi
function validateGenre(item) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error, value } = schema.validate(item);
  return error;
}

// Validate users input for Customer using Joi
function validateCustomer(item) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required(),
    phone: Joi.number().required(),
  });
  const { error, value } = schema.validate(item);
  return error;
}

// Validate users input for Movie using Joi
function validateMovie(item) {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  const { error, value } = schema.validate(item);
  return error;
}

// Validate users input for Movie using Joi
function validateRental(item) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  const { error, value } = schema.validate(item);
  return error;
}

module.exports = {
  validateGenre,
  validateCustomer,
  validateMovie,
  validateRental,
};
