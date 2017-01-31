require('dotenv').config();
const express = require('express');
const request = require('request');
const flash = require('connect-flash');
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

app.get('/api/agencies-with-coverage', function(req, res) {
	const url = 'http://api.pugetsound.onebusaway.org/api/where/agencies-with-coverage.json?key=83203046-c396-4ea2-ae27-72be1ed86993';
	request(url, function(error, response, body) {
		res.send(body);
	})
});

app.get('/api/routes-for-agency/:id', function(req, res) {
	const url = 'http://api.pugetsound.onebusaway.org/api/where/routes-for-agency/'+ req.params.id +'.json?key=83203046-c396-4ea2-ae27-72be1ed86993';
	request(url, function(error, response, body) {
		res.send(body);
	})
});

app.get('/api/stops-for-route/:id', function(req, res) {
	const url = 'http://api.pugetsound.onebusaway.org/api/where/stops-for-route/'+ req.params.id +'.json?key=83203046-c396-4ea2-ae27-72be1ed86993';
	request(url, function(error, response, body) {
		res.send(body);
	})
});

app.set('port', (process.env.PORT || 3010));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
