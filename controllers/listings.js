// !🧩 MVC stands for Model–View–Controller: it’s a design pattern that separates data (Model), user interface (View), and application logic (Controller).
// !✅ This helps keep code organized, easier to maintain, and scalable for larger applications.

const List = require("../models/listings.js");
const { cloudinary } = require("../cloudConfig.js");

module.exports.index = async (req, res) => {
  let listings = await List.find({});
  res.render("listings/allLists.ejs", { listings });
};

module.exports.renderNewList = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showList = async (req, res) => {
  let { id } = req.params;
  const list = await List.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!list) {
    req.flash("error", "The Listing you are trying to access does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { list });
};

module.exports.createList = async (req, res, next) => {
  const list = new List(req.body.listing);
  list.owner = req.user._id;
  list.image.url = req.file.path;
  list.image.fileName = req.file.filename;
  list.geometry = req.body.coordinates;
  let resu = await list.save();
  console.log(resu);
  req.flash("success", "New Listing added successfully");
  res.redirect("/listings");
};

module.exports.editPageRender = async (req, res) => {
  let { id } = req.params;
  const list = await List.findById(id);

  if (!list) {
    req.flash("error", "The Listing you are trying to access does not exist");
    return res.redirect("/listings");
  }
  let originalUrl = list.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/c_fill,h_250,w_250");
  res.render("listings/edit.ejs", { list, originalUrl });
};

module.exports.editList = async (req, res) => {
  console.log("received put request");
  let { id } = req.params;
  let listing = await List.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    listing.image.url = req.file.path;
    listing.image.fileName = req.file.filename;
    await listing.save();
  }

  req.flash("success", "Listing edited successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteList = async (req, res) => {
  let { id } = req.params;
  let listing = await List.findById(id);
  await cloudinary.uploader.destroy(listing.image.fileName);
  await List.deleteOne({ _id: id });
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};
