const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please enter a title for this resource.'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true,
    required: 'A resouce must have a link.'
  },
  category: [String],
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  }
});

resourceSchema.index({
  title: 'text',
  category: 'text',
  tags: 'text',
  description: 'text'
});

resourceSchema.pre('save', async function(next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = slug(this.title);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i');
  const resourcesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (resourcesWithSlug.length) {
    this.slug = `${this.slug}-${resourcesWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Resource', resourceSchema);