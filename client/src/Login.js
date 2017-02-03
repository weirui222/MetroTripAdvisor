import React, { Component } from 'react';
import bus from './img/bus.jpg';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      displayUserName:''
    };
  }

changeName(e) {
  this.setState({userName: e.target.value});
  console.log(e.target.value);
}

displayName(e){
  e.preventDefault();
  if (this.state.userName !== '') {
    this.setState({displayUserName: this.state.userName});
  }

  this.props.route.setusername(this.state.userName);
}

 render() {
   return (
   	<div className="row">
   		<img className='bus' src={bus} />
	    <div className="col-sm-4 col-sm-offset-1">
		 		<h1> Sign Up / Login</h1>
					<form id="signUp" action="/auth/signup" method="POST">
					  <div className="form-group">
					    <label htmlFor="authEmail">Email</label>
					    <input id="authEmail" className="form-control" type="email" name="email" />
					  </div>

					  <div className="form-group">
					    <label htmlFor="authName">Name</label>
					    <input id="authName"  className="form-control" type="text" name="name" />
					  </div>

					  <div className="form-group">
					    <label htmlFor="authPassword">Password</label>
					    <input id="authPassword" className="form-control" type="password" name="password" />
					  </div>
						<input className="btn btn-primary" type="submit"/>
					</form>
				</div>
				<div className="col-sm-4 col-sm-offset-2">
					<ul>
						<li className="note">Please signup or login to the left so you're able to save and track your
					 			favorite buses, routes and stops.</li>
						<li className="note">If you are logging back in, you only need to 
					 			input your email and password.</li>
					</ul>
	      </div>
    </div>
   );
 }
}


export default Login;
