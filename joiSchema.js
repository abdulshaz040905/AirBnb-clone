const Joi = require("joi");

module.exports.listing = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

//reviews -> can be anything like should not be matched with html
//review -> should match with html
module.exports.reviews = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
