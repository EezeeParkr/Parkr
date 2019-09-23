import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import googleMapsKey from '../../apikeys';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 33.988171,
         lng: -118.471024
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapsKey
})(MapContainer);