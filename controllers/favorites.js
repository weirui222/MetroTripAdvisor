const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const moment = require('moment');
const async = require("async");

router.get('/all', isLoggedIn, function(req, res) {
    req.user.getFavorites().then(function(favorites) {
        res.render('favorites/all', {
            favorites: favorites
        });
    });
});

router.get('/:id', isLoggedIn, function(req, res) {
    db.user.findById(req.user.id).then(function(user) {
        db.favorite.findById(req.params.id).then(function(favorite) {
            res.render('favorites/one', {
                favorite: favorite
            });
        });
    });
});

router.post('/:id', isLoggedIn, function(req, res) {
    req.user.createFavorite({
        bus: req.params.id,
        userId: req.user.id,
    }).then(function(favorite) {
        console.log("CREATED FAV", favorite);
        res.send(true);
    });
});
//DELETE BY ID
router.delete("/:id", function(req, res) {
    db.user.findById(req.user.id).then(function(user) {
        db.favorite.findById(req.params.id).then(function(favorite) {
            favorite.destroy();
            console.log(req.params.id);
            res.send({
                message: 'success destroying'
            });
        });
    });
});
// DELETE BY ALL
router.delete("/all", function(req, res) {
    db.user.findById(req.user.id).then(function(user) {
        db.favorite.findById(req.params.id).then(function(favorite) {
            favorite.destroy();
            console.log(req.params.id);
            res.send({
                message: 'success destroying'
            });
        });
    });
});

module.exports = router;
