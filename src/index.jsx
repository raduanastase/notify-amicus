// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

fetch('build/data.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    ReactDOM.render(<App data={json} />, document.getElementById('react-root'));
  });
