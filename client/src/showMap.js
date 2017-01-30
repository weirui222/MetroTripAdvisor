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
  render() {
  	if (this.props.stops.length !== 0) {
  		// this.setState({markers:: this.props.stops});
  	}
  	// 	this.setState({markers:: this.props.stops});
  	// }
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
			    markers={this.props.stops}
			    onMarkerRightClick={_.noop}
			  />
			 </div>
    );
  }
}