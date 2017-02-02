/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,Marker,Polyline,InfoWindow} from "react-google-maps";
import _ from "lodash";
import icon from './img/bus-icon-trans.png';
import SearchBox from "react-google-maps/lib/places/SearchBox";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 47.6062, lng: -122.3321 }}
    center={props.center}
    onClick={props.onMapClick}
    onBoundsChanged={props.onBoundsChanged}
  >
  	<SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Customized your placeholder"
      inputStyle={INPUT_STYLE}
    />
    {
    	props.location ?
    	<Marker position={props.location} /> : null
    }
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        icon={{url: icon}}
        position={marker.position}
        showInfo={marker.showInfo}
        onClick={() => props.onMarkerClick(marker)}
        onRightClick={() => props.onMarkerRightClick(index)}
      >
      	{marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>
              <div>
            		{marker.name}
            	</div>
            	<div>
            		{marker.buses.map((bus,index) => (
            			<button key={index} onClick={() => props.handleRouteClick(bus)}>{bus.shortName}</button>
            			))}
            	</div>
            </div>

          </InfoWindow>
        )}
      </Marker>
    ))}

    {
    	props.polyLines.map((polyline, index) => {
    		let path = [];
    		for (var i = 0; i < polyline.length; i++) {
    			path.push({lat:polyline[i][0], lng:polyline[i][1]});
    		}

    		return <Polyline key={index}
							  strokeColor="#000"
							  path={path} />
    	})
    }
    
  </GoogleMap>
));

export default class ShowMap extends Component {
	state = {
    bounds: null,
    center: {
      lat: 47.6205588,
      lng: -122.3212725,
    }
  };

  handleMapMounted = this.handleMapMounted.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    console.log(places);
    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter
      //markers,
    });

    this.props.handleLocationChanged({
    	lat:mapCenter.lat(),
    	lng:mapCenter.lng()
    });
  }
  render() {
    return (
    	<div>
	      <GettingStartedGoogleMap
			    containerElement={
			      <div style={{ height: `500px` }} />
			    }
			    mapElement={
			      <div style={{ height: `500px` }} />
			    }
			    center={this.state.center}
			    location={this.props.location}
			    onMapLoad={this.handleMapMounted}
			    onBoundsChanged={this.handleBoundsChanged}
        	onSearchBoxMounted={this.handleSearchBoxMounted}
        	bounds={this.state.bounds}
        	onPlacesChanged={this.handlePlacesChanged}
			    onMapClick={_.noop}
			    markers={this.props.stops}
			    polyLines={this.props.polyLines}
			    onMarkerRightClick={_.noop}
			    onMarkerClick={this.props.handleMarkerClick}
          onMarkerClose={this.props.handleMarkerClose}
          handleRouteClick={this.props.handleRouteClick}
			  />


			 </div>
    );
  }
}