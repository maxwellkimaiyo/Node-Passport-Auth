const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
const controller = require("../controller/user.auth");
// Login Page
router.get('/login', forwardAuthenticated, controller.showLogin);

// Register Page
router.get('/register', forwardAuthenticated, controller.showSignup);

// Register
router.post('/register', controller.signUp);

// Login
router.post('/login', controller.login);

// Logout
router.get('/logout', controller.logOut);

module.exports = router;
