const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isAuthor } = require("../views/middleware/isLoggedIn.js");
const { reviewValidate } = require("../views/middleware/isLoggedIn.js");
const reviewController = require("../controllers/review.js");

//review
router.post(
  "/",
  isLoggedIn("You must be logged in to add a new review"),
  reviewValidate,
  wrapAsync(reviewController.addReview)
);

//delete a particular review
router.delete(
  "/:reviewId",
  isLoggedIn("You must be logged in to delete the review"),
  isAuthor("You are not the author of this review"),
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
