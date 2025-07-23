//!We return a function so it can run later, when a real request comes, instead of running immediately at startup when there is no request.

// Server starts:
//    |
// Define isLoggedIn function
//    |
// Call isLoggedIn("Login first to create listing")
//    |
// → returns (req,res,next)=>{} middleware
//    |
// Express keeps it

// User visits route:
//    |
// Express runs saved middleware
//    |
// Uses stored message in closure

const { listing } = require("../../joiSchema.js");
const { reviews } = require("../../joiSchema.js");
const List = require("../../models/listings.js");
const Review = require("../../models/reviews.js");
const ExpressError = require("../../utils/ExpressError.js");

const axios = require("axios");
const maptilerApiKey = process.env.MAP_TOKEN; // your token

module.exports.isLoggedIn = (message = "You must be logged in to do that!") => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.originalUrl = req.originalUrl;
      req.flash("error", message);
      return res.redirect("/login");
    }
    next();
  };
};

module.exports.originalUrl = (req, res, next) => {
  if (req.session.originalUrl) {
    res.locals.originalUrl = req.session.originalUrl;
  }
  next();
};

//joi validation for listing
module.exports.listingValidate = (req, res, next) => {
  const { error } = listing.validate(req.body);
  if (error) {
    throw new ExpressError(404, error);
  }
  next();
};

module.exports.reviewValidate = (req, res, next) => {
  const { error } = reviews.validate(req.body);
  if (error) {
    throw new ExpressError(404, error);
  }
  next();
};

module.exports.isOwner = (message = "You are not the owner") => {
  return async (req, res, next) => {
    let { id } = req.params;
    const list = await List.findById(id);
    if (list && !list.owner.equals(res.locals.currUser._id)) {
      req.flash("error", message);
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
};

module.exports.isAuthor = (message = "You are not the Author") => {
  return async (req, res, next) => {
    let { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (review && !res.locals.currUser._id.equals(review.author)) {
      req.flash("error", message);
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
};

module.exports.geocoding = async (req, res, next) => {
  let location = req.body.listing.location;
  const response = await axios.get(
    "https://api.maptiler.com/geocoding/" +
      encodeURIComponent(location) +
      ".json",
    {
      params: {
        key: maptilerApiKey,
        limit: 1,
      },
    }
  );
  const coordinates = response.data.features[0].geometry;
  req.body.coordinates = coordinates;
  
  next();
};
