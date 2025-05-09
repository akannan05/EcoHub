const express = require('express');
const route = express.Router();

// controller functions
const {
  loginUser,
  signupUser,
} = require('../Controllers/userControllers');

route.post('/login', loginUser);

route.post('/signup', signupUser);


module.exports = route;