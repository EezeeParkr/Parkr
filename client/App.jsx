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
import MapContainer from './components/map.jsx';
// import GoogleApiWrapper from './components/map.jsx';
import Header from './Header';
import Nav from './Nav';
import Map from './Map';
// import Nav from './Nav';

// IMPORT CHILD COMPONENTS HERE

class App extends Component {
  constructor() {
    super();

    // state components
    this.state = {
      // ADD STATE COMPONENTS HERE
    }

    // binding functions to our object here
  }

  componentDidMount() {
    // check if we need this
  }

  componentWillUnmount() {
    // check if we need this
  }

  // add class methods here

  render() {
    // do stuff then return the app

    return (
      <div>
        <Header />
        {/* add things inside this div */}
        <div id="mapContainer">
          <Map />
        </div>
        <div id={'inputPlaceholder'}>Input placeholder</div>
        <Nav />
      </div>
    );
  }

}

export default App;
