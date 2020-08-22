
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { registerValidation } = require('../config/validate');

function showLogin(req, res) {
  res.render('login');
}
function showSignup(req, res) {
  res.render('register')
}
async function signUp(req, res) {
  const { error } = registerValidation(req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2)
    if (error) {
      const message = error.details[0].message;
      errors.push({
        msg: message,
      });
      if (errors.length > 0) {
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      }
    }

  await User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push({ msg: "Email already exists" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              req.flash("success", "Successfuly SignUp");
              req.session.save(function () {
                res.redirect("/login");
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
}

function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    badRequestMessage: "Your Email or Password is missing",
    failureFlash: true,
  })(req, res, next);
}

function logOut(req, res) {
  req.logout();
  req.flash("success", "You are logged out");
  req.session.save(function () {
    res.redirect("/login");
  });
}
module.exports = {
  showLogin: showLogin,
  showSignup: showSignup,
  signUp: signUp,
  login: login,
  logOut: logOut,
};
