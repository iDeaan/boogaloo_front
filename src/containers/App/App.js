import React, { Component } from 'react';
import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';

export default class App extends Component {
  handleClick() {
    console.log('fsdfsd');
  }

  render() {
    require('./App.scss');
    return (
      <div className="app-container">
        <Header />
        <div className="app-content">
          <Menu />
          <div className="content">
            HELLO WORLD
          </div>
        </div>
      </div>
    );
  }
}
