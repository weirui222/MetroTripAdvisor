import React, { Component } from 'react';
import './App.css';

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
          <h2>Title</h2>
        </div>
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
