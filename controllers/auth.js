const express = require('express');
const router = express.Router();
const db = require('../models');
const moment = require('moment');
const async = require("async");

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      console.log('User created!');
      res.redirect('http://localhost:3000');
    } else {
      console.log('Email already exists');
      res.redirect('/login');
    }
  }).catch(function(error) {
    console.log('An error occurred: ', error.message);
    res.redirect('/login');
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
