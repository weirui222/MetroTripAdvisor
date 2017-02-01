import React, { Component } from 'react';
import ShowMap from './showMap';
import Polyline from "polyline";
import Navbar from './Navbar';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencies: [],
      routes: [],
      routeId: "",
      searchTerm: "",
      routeStops:null,
      markers:[],
      polyLines:[]
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
  		window.setTimeout(() => this.performRouteAPIRequest(agencyId), i*200);
  	}
  }

  performRouteAPIRequest(agencyId) {
  	fetch(`/api/routes-for-agency/` + agencyId)
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
  		fetch(`/api/stops-for-route/` + this.state.routeId)
	    .then(response => {
	      response.json().then(data => {
	      	console.log('stops',data);
	        this.setState({routeStops: data.data}, this.drawMarkerRoute);
	      });
	    }).catch(error => {
	      this.setState({routes: null});
	    });
  	}
  }

  showRoute(e) {
  	if (e) {
  		e.preventDefault();
  	}

  	for (var i = 0; i < this.state.routes.length; i++) {
  		if(this.state.routes[i].shortName === this.state.searchTerm) {
  			console.log('this.state.routes[i].shortName',this.state.routes[i].shortName);
  			this.setState({routeId: this.state.routes[i].id}, this.getRouteStop);
  		}
  	}
  }

  drawMarkerRoute() {
  	if (this.state.routeStops) {
  		this.state.markers=[];
  		this.state.polyLines = [];

			for (let i = 0; i < this.state.routeStops.references.stops.length; i++) {
				let latitude = this.state.routeStops.references.stops[i].lat;
				let longitude = this.state.routeStops.references.stops[i].lon;
				let buses = [];
				for (let j = 0; j < this.state.routeStops.references.stops[i].routeIds.length; j++) {
					let routeId = this.state.routeStops.references.stops[i].routeIds[j];
					for (var k = 0; k < this.state.routeStops.references.routes.length; k++) {
						let route = this.state.routeStops.references.routes[k];
						if (route.id === routeId && route.shortName) {
							buses.push({
								shortName:route.shortName,
								routeId:route.id
							});
							break;
						}
					}
				}
				let stop= {
					position: {
						lat: latitude,
						lng: longitude
					},
					showInfo: false,
					name: this.state.routeStops.references.stops[i].name,
					buses: buses
				};
				this.state.markers.push(stop);
				this.setState({markers: this.state.markers});

			}
			for (var j = 0; j < this.state.routeStops.entry.polylines.length; j++) {
				let points = Polyline.decode(this.state.routeStops.entry.polylines[j].points);
				this.state.polyLines.push(points);
				this.setState({polyLines: this.state.polyLines});
			}

		}
  }
  handleRouteClick = this.handleRouteClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  handleRouteClick(bus) {
    this.setState({
      searchTerm: bus.shortName,
      routeId: bus.routeId
    }, this.getRouteStop);
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    return (

      <div>
      	<Navbar />
        <form className="submitForm" onSubmit={(e) => this.showRoute(e)}>
          <input placeholder="Enter the bus" className="inputField" type="text" required
          			 onChange={e => this.searchChange(e)}
                 value={this.state.searchTerm} />
          <button type="submit">Submit</button>
        </form>
      	<ShowMap stops={this.state.markers} polyLines={this.state.polyLines}
      					 handleMarkerClick={this.handleMarkerClick}
      					 handleMarkerClose={this.handleMarkerClose}
      					 handleRouteClick={this.handleRouteClick}/>
        <p><button className="btn btn-primary" id="favButton" onClick={() => this.addFavorite(this.state.searchTerm)}>Add to Favorites</button></p>
      </div>
   );
 }

}

export default Map;
