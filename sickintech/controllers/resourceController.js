const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');

exports.addResource = (req, res) => {
  res.render('editResource', { title: 'Add a Resource' });
};

exports.createResource = async (req, res) => {
  req.body.user = req.user._id;
  const resource = await (new Resource(req.body)).save();
  req.flash('success', `Successfully created ${resource.title}!`);
  res.redirect(`/resource/${resource.slug}`);
};

exports.getResourceBySlug = async (req, res, next) => {
  const resource = await Resource.findOne({ slug: req.params.slug });
  if (!resource) return next();
  res.render('resource', { title: resource.title, resource });
};

exports.getResources = async (req, res) => {
  const resources = await Resource.find();
  res.render('resources', { title: 'Resources', resources });
};