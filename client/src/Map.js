import React, { Component } from 'react';
import ShowMap from './showMap';
import Polyline from "polyline";
import $ from "jquery";

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
      polyLines:[],
      location:null,
      favorites: []
    };

    this.performAgencyAPIRequest();
    this.getFavorites();
  }

  performAgencyAPIRequest() {
    fetch(`/api/agencies-with-coverage`)
    .then(response => {
      response.json().then(data => {
        // console.log('data',data);
        this.setState({agencies: data.data.references.agencies}, this.performRouteAPIRequests);
        // console.log('agencies',this.state.agencies);
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

  showRoute(e) {
  	if (e) {
  		e.preventDefault();
  	}

  	for (var i = 0; i < this.state.routes.length; i++) {
  		let route = this.state.routes[i];
  		if(route.shortName === this.state.searchTerm) {
  			console.log('route.shortName',route.shortName);
  			this.setState({routeId: route.id}, this.getRouteStop);
  		}
  	}
  }

  getRouteStop() {
  	if(this.state.routeId !== ""){
  		fetch(`/api/stops-for-route/` + this.state.routeId)
	    .then(response => {
	      response.json().then(data => {
	      	// console.log('stops',data);
	        this.setState({routeStops: data.data}, this.drawMarkerRoute);
	      });
	    }).catch(error => {
	      this.setState({routes: null});
	    });
  	}
  }

  drawMarkerRoute() {
  	if (this.state.routeStops) {
  		this.state.markers = [];
  		this.state.polyLines = [];

			for (let i = 0; i < this.state.routeStops.references.stops.length; i++) {
				let theStop = this.state.routeStops.references.stops[i];
				let buses = [];
				for (let j = 0; j < theStop.routeIds.length; j++) {
					let routeId = theStop.routeIds[j];
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
						lat: theStop.lat,
						lng: theStop.lon
					},
					showInfo: false,
					name: theStop.name,
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

  handleLocationChanged = this.handleLocationChanged.bind(this);
  handleLocationChanged(location) {
  	this.setState({location:location});
  	fetch(`/api/stops-for-location/${location.lat}/${location.lng}`)
    .then(response => {
      response.json().then(data => {
        console.log('data',data);
        this.drawNearbyStops(data.data);
      });
    }).catch(error => {
    });
  }

  drawNearbyStops(data) {
		this.state.markers=[];

		for (let i = 0; i < data.list.length; i++) {
			let theStop = data.list[i];
			let buses = [];
			for (let j = 0; j < theStop.routeIds.length; j++) {
				let routeId = theStop.routeIds[j];
				for (var k = 0; k < data.references.routes.length; k++) {
					let route = data.references.routes[k];
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
					lat: theStop.lat,
					lng: theStop.lon
				},
				showInfo: false,
				name: theStop.name,
				buses: buses
			};
			this.state.markers.push(stop);
		}

		this.setState({markers: this.state.markers});

		this.setState({polyLines: []});
  }

  addFavorite(e) {
  	e.preventDefault();
  	let thisComp = this;
    $.ajax({
        method: 'POST',
        url: '/favorites/' + this.state.searchTerm
    }).done(function(data) {
        thisComp.getFavorites();
    });
  }

  getFavorites() {
  	let thisComp = this;
  	$.ajax({
  		method: 'GET',
  		url: '/favorites/all'
  	}).done(function(data){
  		thisComp.setState({
  			favorites: data
  		})
  	});
  }

  handleFavoriteClick = this.handleFavoriteClick.bind(this);
  handleFavoriteClick(bus) {
  	this.setState({searchTerm: bus.toString()}, this.showRoute);
  }

  handleFavoriteDelete = this.handleFavoriteDelete.bind(this);
  handleFavoriteDelete(id) {
  	let thisComp = this;
  	$.ajax({
  		method: 'DELETE',
  		url: '/favorites/' + id
  	}).done(function(data){
  		thisComp.getFavorites();
  	});
  }

  render() {
    return (
      <div className="row">
      	<div className="col-sm-3">
      		<h4 className="btn-primary">Location: search on Map</h4>
      		<h4 className="btn-primary">Search for routes</h4>
	        <form className="submitForm" onSubmit={(e) => this.showRoute(e)}>
	          <input placeholder="Enter a bus" className="inputField" type="text" required
	          			 onChange={e => this.searchChange(e)}
	                 value={this.state.searchTerm} />
	          <button className="btn btn-info mapbutton" type="submit">Submit</button>
	        </form>
	        <button className="btn btn-info mapbutton" id="favButton" onClick={(e) =>
	        				this.addFavorite(e)}>
	        				Add to Favorites</button>
	        <h4 className="btn-primary">Favorite routes</h4>
	        <ul>
	        {
	        	this.state.favorites.map((favorite, index) => (
	        			<li key={index}>
	        				<a onClick={() => this.handleFavoriteClick(favorite.bus)}>{favorite.bus}</a>
	        				&nbsp;
	        				<a className="delete" onClick={() => this.handleFavoriteDelete(favorite.id)}>X</a>
	        			</li>
	        		))
	        }
	        </ul>
        </div>
        <div className="col-sm-9">
	      	<ShowMap stops={this.state.markers} polyLines={this.state.polyLines}
	      					 location={this.state.location}
	      					 handleMarkerClick={this.handleMarkerClick}
	      					 handleMarkerClose={this.handleMarkerClose}
	      					 handleRouteClick={this.handleRouteClick}
	      					 handleLocationChanged={this.handleLocationChanged}/>
      	</div>
      </div>
   );
 }

}

export default Map;
