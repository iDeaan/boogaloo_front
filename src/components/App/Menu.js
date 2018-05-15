import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends PureComponent {
  render() {
    require('./Menu.scss');
    return (
      <div className="app-menu menu-container">
        <div className="menu-item">
          <Link to="/">Головна сторінка</Link>
        </div>
        <div className="menu-item">
          <Link to="/sign">Реєстрація</Link>
        </div>
      </div>
    );
  }
}
