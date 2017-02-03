import React, { Component } from 'react';

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
	    <div className="col-sm-4 col-sm-offset-1">
		 		<h1> Sign Up </h1>
					<form id="signUp" action="/auth/signup" method="POST" onSubmit={e => this.displayName(e)}>
					  <div className="form-group">
					    <label htmlFor="authEmail">Email</label>
					    <input id="authEmail" className="form-control" type="email" name="email" />
					  </div>

					  <div className="form-group">
					    <label htmlFor="authName">Name</label>
					    <input id="authName" onChange={e => this.changeName(e)} className="form-control" type="text" name="name" />
					  </div>

					  <div className="form-group">
					    <label htmlFor="authPassword">Password</label>
					    <input id="authPassword" className="form-control" type="password" name="password" />
					  </div>
						<input className="btn btn-primary" type="submit"/>
					</form>
				</div>
				<div className="col-sm-4 col-sm-offset-2">
					<h1> Log In </h1>
					<form id="login" action="/auth/login" method="POST">
						<div className="form-group">
						  <label htmlFor="authEmail">Email</label>
						  <input id="authEmail" className="form-control" type="email" name="email" />
						</div>

						<div className="form-group">
						  <label htmlFor="authPassword">Password</label>
						  <input id="authPassword" className="form-control" type="password" name="password" />
						</div>

						<input className="btn btn-primary" type="submit" />
					</form>
	    </div>
    </div>
   );
 }
}


export default Login;
