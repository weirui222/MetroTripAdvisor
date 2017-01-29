const express = require('express');
const request = require('request');

const app = express();

app.get('/api/agencies-with-coverage', function(req, res) {
	const url = 'http://api.pugetsound.onebusaway.org/api/where/agencies-with-coverage.json?key=TEST';
	request(url, function(error, response, body) {
		res.send(body);
	})
});

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
