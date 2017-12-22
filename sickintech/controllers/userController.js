const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = (req, res) => {
  res.render('login', { title: 'Login' });
};