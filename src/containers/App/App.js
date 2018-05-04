import React, { Component } from 'react';

export default class App extends Component {
  render() {
    require('./App.scss');
    return (
      <div className="app-container">
        <h1>HELLO WORLD</h1>
      </div>
    );
  }
}
