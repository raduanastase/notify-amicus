// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const baseUrl = 'http://localhost/notify/';
const buildComponent = (json) => {
  ReactDOM.render(<App data={json} baseUrl={baseUrl}/>, document.getElementById('react-root'));
};

//fetch(`build/data.json`)
fetch(`${baseUrl}cache.json`)
  .then(response => {
    return response.json();
  })
  .then(json => {
    buildComponent(json);
  })
  .catch(() => {
    fetch(`${baseUrl}api.php`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        buildComponent(json);
      });
  });