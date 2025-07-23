const List = require("../models/listings.js");
const Review = require("../models/reviews.js");

module.exports.addReview = async (req, res, next) => {
  let listing = await List.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = res.locals.currUser._id;
  listing.review.push(newReview._id);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review added successfully");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await List.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "review deleted successfully");

  res.redirect(`/listings/${id}`);
};
