const db = require('../models');
const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

router.get('/', function(req, res) {
    res.render('/');
});

router.get('/signup', function(req, res) {
   res.render('./auth/signup');
});

router.post('/signup', function(req, res) {
// find or create user profile
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
// defaults account for other values not listed above like password and name
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
// spread is the promise for the db call, was user object created
    }).spread(function(user, created) {
        if (created) {
// once you create a account it auto logs you in
            passport.authenticate('local', {
                successRedirect: 'http://localhost:3000/',
                successFlash: 'account created and logged in'
            })(req, res);
// req and res here get passed into passport.authenticate function it's in
            // res.redirect('/');
        } else {
            req.flash('error', 'email already exists');
            res.redirect('http://localhost:3000/');
        }
    }).catch(function(error) {
    	  console.log("ERROR:", error);
        req.flash('error', error.message);
        res.redirect('http://localhost:3000/');
    });
    // res.send(req.body);
// json data shows on page with res.send email name and password
});

router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/',
    successFlash: 'logged in',
    failureFlash: 'invalid username or password'
}));

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth/login',
    failureFlash: 'An error occurred, please try later',
    successFlash: 'You have logged in with Facebook'
}));


router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'logged out');
    res.redirect('/');
});

module.exports = router;
