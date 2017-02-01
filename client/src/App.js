import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Map from './Map';
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const browserHistory = require('react-router').browserHistory;

class App extends Component {

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
