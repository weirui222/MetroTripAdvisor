import React, { Component } from 'react';
import './App.css';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';

	class App extends Component {
		constructor(props) {
	    super(props);

	    this.state = {
	      agencies: [],
	      routes: [],
	      routeId: "",
	      searchTerm: "",
	      routeStops:null

	    };

	    this.performAgencyAPIRequest();
	  }

  responseFacebook (response) {
    console.log(response);
    //anything else you want to do(save to localStorage)...
  }

	responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
		console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  }


  performAgencyAPIRequest() {
  	fetch(`/api/agencies-with-coverage`)
    .then(response => {
      response.json().then(data => {
        console.log('data',data);
        this.setState({agencies: data.data.references.agencies}, this.performRouteAPIRequests);
        console.log('agencies',this.state.agencies);
      });
    }).catch(error => {
      this.setState({agencies: null});
    });
  }

  performRouteAPIRequests() {
  	for (var i = 0; i < this.state.agencies.length; i++) {
  		const agencyId = this.state.agencies[i].id;
  		window.setTimeout(() => this.performRouteAPIRequest(agencyId), i*500);
  	}
  }

  performRouteAPIRequest(agencyId) {
  	fetch(`/routes-for-agency/` + agencyId)
	    .then(response => {
	      response.json().then(data => {
	      	for (var j = 0; j < data.data.list.length; j++) {
	      		this.state.routes.push(data.data.list[j]);
	      	}
	        this.setState({routes: this.state.routes});
	      });
	    }).catch(error => {
	      this.setState({routes: null});
	    });
  }

  searchChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  getRouteStop() {
  	if(this.state.routeId !== ""){
  		fetch(`/stops-for-route/` + this.state.routeId)
	    .then(response => {
	      response.json().then(data => {
	      	console.log('stops',data);
	        this.setState({routeStops: data.data});
	      });
	    }).catch(error => {
	      this.setState({routes: null});
	    });
  	}
  }

  showRoute(e) {
  	e.preventDefault();
  	for (var i = 0; i < this.state.routes.length; i++) {
  		if(this.state.routes[i].shortName === this.state.searchTerm) {
  			console.log('this.state.routes[i].shortName',this.state.routes[i].shortName);
  			this.setState({routeId: this.state.routes[i].id}, this.getRouteStop);
  		}
  	}

  }

  render() {
  	let listStops = [];
  	if (this.state.routeStops) {
  		listStops = this.state.routeStops.references.stops.map((stop, index) => {
  			return <li key={index}> {stop.name} </li> });
  	}

    return (
      <div className="App">
        <div className="App-header">
	        <FacebookLogin socialId="1657533017874708"
	                       language="en_US"
	                       scope="public_profile,email"
												 fields="name,email,picture"
	                       responseHandler={this.responseFacebook}
	                       xfbml={true}
	                       version="v2.5"
	                       class="facebook-login"
	                       buttonText="Login With Facebook"/>
				</div>
				<div>
					<GoogleLogin socialId="21709892006-c0kl7vs3u1q4ue7nt5jbec70nvm4nuqt.apps.googleusercontent.com"
			                      class="google-login"
			                      scope="profile"
														fields="name,email,picture"
			                      responseHandler={this.responseGoogle}
			                      buttonText="Login With Google"/>
			       </div>
          <h2>Title</h2>
        <form className="submitForm" onSubmit={(e) => this.showRoute(e)}>
          <input placeholder="Enter the bus" className="inputField" type="text" required
          			 onChange={e => this.searchChange(e)}
                 value={this.state.searchTerm}
              />
              <button type="submit">Submit</button>

        </form>
        <div>
        	<ul>
          	{listStops}
          </ul>
      	</div>
      </div>
    );
  }
}




export default App;
