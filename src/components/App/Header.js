import React, { PureComponent } from 'react';

export default class Header extends PureComponent {
  render() {
    // require('./Header.scss');
    return (
      <header className="app-header">
        <div className="logo">
          Boogaloo
        </div>
        <div className="header-actions">
          <div className="search">
            fsdfds
          </div>
        </div>
      </header>
    );
  }
}
