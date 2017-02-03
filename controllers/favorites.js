const express = require('express');
const router = express.Router();
const db = require('../models');
const moment = require('moment');
const async = require("async");

router.get('/all', function(req, res) {
    db.favorite.findAll().then(function(favorites) {
        res.send(favorites);
    });
});

router.post('/:id', function(req, res) {
    db.favorite.findOrCreate({
      where: { bus: req.params.id }
    }).then(function(favorite) {
        console.log("CREATED FAV", favorite);
        res.send({
        	message: 'successfully created'
        });
    });
});
//DELETE BY ID
router.delete("/:id", function(req, res) {
    db.favorite.findById(req.params.id).then(function(favorite) {
        favorite.destroy();
        console.log(req.params.id);
        res.send({
            message: 'success destroying'
        });
    });
});

module.exports = router;
