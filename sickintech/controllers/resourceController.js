const mongoose = require("mongoose");
const Resource = mongoose.model("Resource");

exports.addResource = (req, res) => {
  res.render("editResource", { title: "Create Resource" });
};

exports.createResource = async (req, res) => {
  req.body.author = req.user._id;
  const resource = await new Resource(req.body).save();
  req.flash("success", `Successfully created ${resource.title}!`);
  res.render("resources", { flashes: req.flash() });
};

exports.getResourceBySlug = async (req, res, next) => {
  const resource = await Resource.findOne({ slug: req.params.slug });
  if (!resource) return next();
  res.render("resource", { title: resource.title, resource });
};

exports.getResources = async (req, res) => {
  const resources = await Resource.find();
  res.render("resources", { title: "Resources", resources });
};

exports.editResource = async (req, res) => {
  const resource = await Resource.findOne({ slug: req.params.slug });
  if (!resource) return next();
  res.render("editResource", { title: `Edit ${resource.title}`, resource });
};

exports.updateResource = async (req, res) => {
  const resource = await Resource.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).exec();
  req.flash(
    "success",
    `Successfully updated <strong>${resource.title}</strong>.`
  );
  res.redirect(`/resource/${resource.slug}`);
};

exports.deleteResource = async (req, res) => {
  const resource = await Resource.findOneAndRemove({ slug: req.params.slug });
  if (!resource) return next();
  req.flash("success", `Successfully deleted ${resource.title}.`);
  res.redirect("/resources");
};
