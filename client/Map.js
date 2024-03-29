import { GoogleApiWrapper, Map, InfoWindow, Marker, Polygon } from 'google-maps-react';
import YOUR_GOOGLE_API_KEY_GOES_HERE from '../config';
import React from 'react';
import axios from "axios";

// ...

const LoadingContainer = (props) => (
  <div>Wait for map loading!</div>
);

const style = {
  width: '100%',
  height: '95%',
  // boxShadow: '0 2px 2px rgba(0,0,0,0.5)'
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {},
      markers: [],
      activeMarker: {},
      showingInfoWindow: false,
      parking: [],
      currentMarker: {}
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
    console.log('closed!');
  };
  mapClicked (mapProps, map, clickEvent) {
    // ...
    // console.log(mapProps);
    // console.log(map);
    const lat = clickEvent.latLng.lat(); // current marker latitude
    const lng = clickEvent.latLng.lng(); // current marker longitude
    map.panTo(clickEvent.latLng); // center map with marker

    // when click, it should update state for showing info and active makers
    this.setState(prev => ({
      ...prev,
      showingInfoWindow: false,
      activeMarker: null,
      currentMarker: {
        lat,
        lng
      }
    }));
    const position = { lat, lng };
    // this is from parent component
    this.props.changePosition(position);
    this.props.setCenter(position);
  };
  centerMoved(mapProps, map) {
    // ...
  }
  componentDidMount() {
    // fetch data
    axios.get('/parking').then(res => {
      console.log('res ', res.data);
      this.setState(prev => ({
        ...prev,
        markers: res.data.map(parking => {
          return <Marker key={parking.lat + parking.lng} onClick={this.onMarkerClick} position={{lat: parking.lat, lng: parking.lng}} name={parking.message} />
        }),
      }));
    }).catch(e => {
      console.log(e);
    });
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
      <Map id={'map'} google={this.props.google} zoom={16} onClick={this.mapClicked} onDragend={this.centerMoved} style={style} initialCenter={{
        lat: 33.987870,
        lng: -118.470614
      }}
        center={{
          lat: this.props.center.lat,
          lng: this.props.center.lng
        }}
      >
        {
          /* This current marker that was clicked on map */
          this.state.currentMarker.lat && <Marker onClick={this.onMarkerClick} position={{lat: this.state.currentMarker.lat, lng: this.state.currentMarker.lng}} name={'Please submit to save'} />
        }
        {/*}*/}
        {
          /* Populate component with Marker components with right information */
          this.props.parking.map(parking => {
            return <Marker key={parking.lat + parking.lng} onClick={this.onMarkerClick} position={{lat: parking.lat, lng: parking.lng}} name={parking.message} />
          })
        }
        {/* Popup when click marker */}
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