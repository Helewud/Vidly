const Joi = require("joi");

//function to validate users input using Joi
function validateGenre(item) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error, value } = schema.validate(item);
  return error;
}

function validateCustomer(item) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
      name: Joi.string().required(),
      phone:Joi.number().required()
    });
    const { error, value } = schema.validate(item);
    return error;
  }

  function validateMovie(item) {
    const schema = Joi.object({
      title: Joi.string().required(),
      genre: Joi.string().required(),
      numberInStock:Joi.number().required(),
      dailyRentalRate: Joi.number().required()
    });
    const { error, value } = schema.validate(item);
    return error;
  }

module.exports = { validateGenre, validateCustomer, validateMovie };