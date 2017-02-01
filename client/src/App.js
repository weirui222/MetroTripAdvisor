import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Map from './Map';
import Bookmarks from './Bookmarks';
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const browserHistory = require('react-router').browserHistory;

<<<<<<< HEAD
	class App extends Component {
		render() {
	    return (
	      <div className="container">
					<Router history={browserHistory}>
						<Navbar />
						<Route path="/" component={Map} />
						<Route path="/Login" component={Login} />
						<Route path="/Bookmarks" component={Bookmarks} />
					</Router>
	      </div>
	    );
  }
=======
class App extends Component {
>>>>>>> 48bf58ea6f9b7394b0fdd0733f69b754a7f00b74

	render() {
    return (
      <div className="container">
				<Router history={browserHistory}>
					<Navbar />
					<Route path="/" component={Map} />
					<Route path="/Login" component={Login} />
				</Router>
      </div>
    );
	}
}

export default App;
