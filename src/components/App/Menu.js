import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends PureComponent {
  render() {
    return (
      <div className="app-menu">
        <Link to="/">Головна сторінка</Link>
        <Link to="/sign">Реєстрація</Link>
      </div>
    );
  }
}
