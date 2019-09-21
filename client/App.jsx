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
        SUPER COOL APP
      </div>
    );
  }

}

export default App;