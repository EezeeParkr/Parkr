import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
import YOUR_GOOGLE_API_KEY_GOES_HERE from '../config';
import React from 'react';

// ...

const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
);

const style = {
  width: '100%',
  height: '80%',
  boxShadow: '0 2px 2px rgba(0,0,0,0.5)'
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {
        name: 'None for now'
      }
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
  }
  onMouseoverMarker(props, marker, e) {
    // ..
  }
  onMarkerClick (props, marker, e) {

  };
  onInfoWindowClose () {

  };
  mapClicked (mapProps, map, clickEvent) {
    // ...
  };
  centerMoved(mapProps, map) {
    // ...
  }
  render() {
    return (
      <Map id={'map'} google={this.props.google} zoom={14} onClick={this.mapClicked} onDragend={this.centerMoved} style={style}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} onMouseover={this.onMouseoverMarker} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE),
  LoadingContainer: LoadingContainer
})(MapContainer)