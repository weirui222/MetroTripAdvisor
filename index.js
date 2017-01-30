require('dotenv').config();
const flash = require('connect-flash');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const moment = require('moment');
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');

//globals
const app = express();
const db = require("./models");
//set /use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
  secret: 'Super secrettttt',
  resave: false,
  saveUninitialized: true
}));
app.use(require('morgan')('dev'));

app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3010);
