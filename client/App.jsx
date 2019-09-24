/**
 * ************************************
 *
 * @module  App.jsx
 * @author Timothy Mai
 * @date 9/21/19
 * @description the main body of the app
 *
 * ************************************
 */

import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Map from './Map';
import axios from 'axios';

// IMPORT CHILD COMPONENTS HERE

class App extends Component {
  constructor(props) {
    super(props);

    // state components
    this.state = {
      // ADD STATE COMPONENTS HERE
      position: {
        lat: 33.987870,
        lng: -118.470614
      },
      parking: [],
      center: {
        lat: 33.987870,
        lng: -118.470614
      }
    };

    // binding functions to our object here
    this.changePosition = this.changePosition.bind(this);
    this.updateParking = this.updateParking.bind(this);
    this.addParking = this.addParking.bind(this);
    this.setCenter = this.setCenter.bind(this);
  }
  setCenter(position) {
    // this.state.center will be the center position of map
    this.setState(prev => ({
      ...prev,
      center: position
    }));
  }

  componentDidMount() {
    // fetch data from db for parking and set that it to state
    axios
      .get('/parking')
      .then(res => {
        this.setState(prev => ({
          ...prev,
          parking: res.data
        }));
      }).catch(e => {
    });
  }

  addParking(lat, lng) {
    // when click, it should update state for showing info and active makers
    this.setState(prev => ({
      ...prev,
      parking: [...prev.parking, {
        lat,
        lng,
        message: '',
        // startTime,
        // endTime,
        // currDay,
        // currDate
      }],
    }));
  }

  // add class methods here
  changePosition(position) { // This is for current position
    this.setState(prev => ({
      ...prev,
      position
    }));
  };

  updateParking() {
    axios
      .get('/parking')
      .then(res => {
      this.setState(prev => ({
        ...prev,
        parking: res.data
      }));
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    // do stuff then return the app

    return (
      <div>
        <Header />
        {/* add things inside this div */}
        <div id="mapContainer">
          <Map parking={this.state.parking} addParking={this.addParking} changePosition={this.changePosition} center={this.state.center} setCenter={this.setCenter}/>
        </div>

        <Nav position={this.state.position} updateParking={this.updateParking} parking={this.state.parking} setCenter={this.setCenter} />
      </div>
    );
  }

}

export default App;
