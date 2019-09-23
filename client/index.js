/**
 * ************************************
 *
 * @module  index.js
 * @author Timothy Mai
 * @date 9/21/19
 * @description entry point for app. Hangs React app off of #app in index.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx'; // this hasn't been created yet
import "./public/style.css";

render(
  <App />,
  document.getElementById('app') // app is hung off the 'app' id in index.html
);

