import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,Marker} from "react-google-maps";
import _ from "lodash";


const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={11}
    defaultCenter={{ lat: 47.6062, lng: -122.3321 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export default class ShowMap extends Component {
	
	constructor(props) {
		super(props)
		console.log("props", this.props);
		this.state = {
      markers: [{
	      position: {
	        lat: 47.6062,
	        lng: -122.3321,
	      },
	      key: ``,
	      defaultAnimation: 2,
	    }]
    };
  };
  render() {
  	let tepmarkers=[];
  	if (this.props.stops) {
			for (var i = 0; i < this.props.stops.length; i++) {
				let latitude = this.props.stops[i].lat;
				let longitude = this.props.stops[i].lon;
				let stop= {
					position: {
						lat: latitude, 
						lng: longitude
					},
		  		key: this.props.stops[i].name + i,
		  		defaultAnimation: 2
				};
				tepmarkers.push(stop);
			}
		}

  	console.log("tepmarkers", tepmarkers)
    return (
    	<div>
	      <GettingStartedGoogleMap
			    containerElement={
			      <div style={{ height: `500px` }} />
			    }
			    mapElement={
			      <div style={{ height: `500px` }} />
			    }
			    onMapLoad={_.noop}
			    onMapClick={_.noop}
			    markers={tepmarkers}
			    onMarkerRightClick={_.noop}
			  />
			 </div>
    );
  }
}