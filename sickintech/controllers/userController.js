const mongoose = require("mongoose");
const User = mongoose.model("User");
const Resource = mongoose.model("Resource");
const promisify = require("es6-promisify");

exports.loginForm = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.registerForm = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("username");
  req.checkBody("username", "You must provide a username!").notEmpty();
  req.checkBody("email", "That email is not valid!").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Password cannot be blank!").notEmpty();
  req
    .checkBody("password-confirm", "Confirmed password cannot be blank!")
    .notEmpty();
  req
    .checkBody("password-confirm", "Oops! Your passwords don't match!")
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash("error", errors.map(err => err.msg));
    res.render("register", { title: "Register", body: req.body });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, username: req.body.username });
  // User.register(user, req.body.password, function(err) {
  //   if (err) {
  //     req.flash("error", err.message);
  //     res.render("register", { user });
  //   }
  //   next(err);
  // });

  const register = promisify(User.register, User);
  register(user, req.body.password).then(next, error => {
    req.flash("error", error.message);
    res.render("register", { attemptedUser: user, flashes: req.flash() });
  });
};

exports.accountInfo = async (req, res) => {
  // TODO: refactor to send both mongo reqs at once
  const userResources = await Resource.find({ author: req.user._id });
  res.render("account", {
    title: req.user.username,
    userResources
  });
};

exports.updateBookmark = async (req, res) => {
  // TODO: REFACTOR
  const currentUser = await User.findOne({ _id: req.user._id });
  const hasBookmarks =
    currentUser.bookmarks.filter(bm => bm._id == req.params.id).length > 0;
  const addOperator = "$addToSet";
  const removeOperator = "$pull";
  const operator = hasBookmarks ? removeOperator : addOperator;
  const bookmark = await User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { bookmarks: req.params.id } },
    { new: true }
  );
  if (operator == removeOperator) {
    req.flash("success", "Removed from your bookmarks.");
    res.redirect("/account");
  } else if (operator == addOperator) {
    req.flash(
      "success",
      "Consider it bookmarked! You can view all your bookmarks in your Account."
    );
    res.redirect("/resources");
  }
};
