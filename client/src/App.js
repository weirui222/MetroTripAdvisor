import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Map from './Map';
import Bookmarks from './Bookmarks';
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const browserHistory = require('react-router').browserHistory;

	class App extends Component {
		constructor(props) {
			super(props);

			this.state = {
				username: ''
			}
		}

		render() {
	    return (
	      <div className="container">
					<Navbar username={this.state.username} />
					<Router history={browserHistory}>
						<Navbar />
						<Route path="/" component={Map} />
						<Route path="/Login" setusername={newUsername => {this.setUserName(newUsername)}} component={Login} />
						<Route path="/Bookmarks" component={Bookmarks} />
					</Router>
	      </div>
	    );
  }

	setUserName(newUsername) {
		// console.log(this);
		// console.log(newUsername);
		this.setState({username: newUsername});
	}
}

export default App;
