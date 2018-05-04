import React, { PureComponent } from 'react';

export default class Menu extends PureComponent {
  render() {
    require('./Header.scss');
    return (
      <div className="app-menu">
        <div>Головна</div>
        <div>Про нас</div>
      </div>
    );
  }
}
