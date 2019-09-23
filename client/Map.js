import { GoogleApiWrapper, Map, InfoWindow, Marker, Polygon } from 'google-maps-react';
import YOUR_GOOGLE_API_KEY_GOES_HERE from '../config';
import React from 'react';

// ...

const LoadingContainer = (props) => (
  <div>Wait for map loading!</div>
);

const style = {
  width: '100%',
  height: '100%',
  // boxShadow: '0 2px 2px rgba(0,0,0,0.5)'
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {},
      markers: [],
      activeMarker: {},
      showingInfoWindow: false
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
  }
  onMarkerClick (markerProps, marker, e) {
    this.setState(prev => ({
      ...prev,
      selectedPlace: markerProps,
      activeMarker: marker,
      showingInfoWindow: true
    }));
  };
  onInfoWindowClose () {

  };
  mapClicked (mapProps, map, clickEvent) {
    // ...
    // console.log(mapProps);
    // console.log(map);
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    map.panTo(clickEvent.latLng);
    // console.log(map)
    this.setState(prev => ({
      ...prev,
      showingInfoWindow: false,
      activeMarker: null,
      markers: [...prev.markers, <Marker key={lat + lng} name={'You set the position'} onClick={this.onMarkerClick} position={{ lat, lng }} />]
    }));
    const position = { lat, lng };
    this.props.changePosition(position);
  };
  centerMoved(mapProps, map) {
    // ...
  }

  render() {
    // these are some sample coordinates used to create a polygon on the page
    // if you only have two points in your polygon, you create a line
    // const triangleCoords = [
    //   {lat: 25.774, lng: -80.190},
    //   {lat: 18.466, lng: -66.118},
    //   {lat: 32.321, lng: -64.757},
    //   {lat: 25.774, lng: -80.190}
    // ];
    
    return (
      <Map id={'map'} google={this.props.google} zoom={14} onClick={this.mapClicked} onDragend={this.centerMoved} style={style}>
        {
          this.state.markers
        }

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

        {/* use this code to create a polygon (or a line) */}
        {/* <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} /> */}

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE),
  LoadingContainer: LoadingContainer
})(MapContainer)