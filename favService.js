const express = require('express');
const router = express.Router();
const express = require('express');
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const moment = require('moment');
const async = require("async");
import $ from "jquery";

addFavorite() {
    $.ajax({
        method: 'POST',
        url: 'localhost:3000/boomkmarks',
    }).done(function(data) {
        console.log(fav ajax posting);
        window.location = './';
    });
}

editNickname() {
   var json = JSON.stringify({username: "Brian"});
   fetch(`http://pennyauctionserver.herokuapp.com/auctions/${this.props.id}`,
     {
       method: 'PUT',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: json
     }
   ).then((response) => {
     return response.json();
   }).then((response) => {
     console.log("put response", response);
   }).catch((response) => {
     console.log('Error!', response);
   });
 }


$('.delete-link').on('click', function(e) {
  e.preventDefault();
  var Element = $(this);
  var Url = Element.attr('href');
  $.ajax({
    method: 'DELETE',
    url: Url
  }).done(function(data) {
    console.log(data);
    Element.remove();
    window.location = 'localhost:3000/boomkmarks';
  });
});

module.exports = router;
