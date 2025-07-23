// /new → form to create new
// /:id/edit → form to edit
// /:id → show details (GET), update (PUT), or delete (DELETE)

const express = require("express");
const router = express.Router();
const List = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  isLoggedIn,
  listingValidate,
  isOwner,
  geocoding,
} = require("../views/middleware/isLoggedIn.js");
const listingController = require("../controllers/listings.js");

//for file uploads
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

//print all Listings
//create new list
router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn("You must be logged in to create a new listing"),
  upload.single("listing[image]"),
  listingValidate,
  geocoding,
  wrapAsync(listingController.createList)
);

//render new list page
router.get(
  "/new",
  isLoggedIn("You must be logged in to create a new listing"),
  listingController.renderNewList
);

//show particular listing
//delete a list
router
  .route("/:id")
  .get(wrapAsync(listingController.showList))
  .delete(
    isLoggedIn("You must be logged in to delete the listing"),
    isOwner("you are not the owner of this listing to delete it"),
    wrapAsync(listingController.deleteList)
  )
  .put(
    isLoggedIn("You must be logged in to edit the listing"),
    isOwner("you are not the owner of this listing to edit it"),
    listingValidate,
    upload.single("listing[image]"),
    wrapAsync(listingController.editList)
  );

//edit page render
//edit a list based on id
router
  .route("/:id/edit")
  .get(
    isLoggedIn("You must be logged in to edit the listing"),
    isOwner("you are not the owner of this listing to edit it"),
    wrapAsync(listingController.editPageRender)
  );

module.exports = router;
