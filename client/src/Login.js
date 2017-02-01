import React, { Component } from 'react';
import Navbar from './Navbar';

class Login extends Component {
 render() {
   return (
    <div>
     	<Navbar />
			<a href="http://localhost:3010/auth/facebook" class="btn btn-primary">
	   		Login via Facebook
	 		</a>
	 		<h1> sign up </h1>
			<form id="signUp" action="http://localhost:3010/auth/signup" method="POST">
			  <div className="form-group">
			    <label for="authEmail">Email</label>
			    <input id="authEmail" className="form-control" type="email" name="email" />
			  </div>

			  <div className="form-group">
			    <label for="authName">Name</label>
			    <input id="authName" className="form-control" type="text" name="name" />
			  </div>

			  <div class="form-group">
			    <label for="authPassword">Password</label>
			    <input id="authPassword" className="form-control" type="password" name="password" />
			  </div>
				<input className="btn btn-primary" type="submit"/>
			</form>
			<h1> login </h1>
			<form id="login" action="http://localhost:3010/auth/login" method="POST">
				<div className="form-group">
				  <label for="authEmail">Email</label>
				  <input id="authEmail" className="form-control" type="email" name="email" />
				</div>

				<div className="form-group">
				  <label for="authPassword">Password</label>
				  <input id="authPassword" className="form-control" type="password" name="password" />
				</div>

				<input className="btn btn-primary" type="submit" />
			</form>
    </div>
   );
 }
}


export default Login;
