import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'initialTitle'
  };

  render() {
    const { title } = this.props;
    return (
      <div className="app-menu">
        <Link to="/">Головна1</Link>
        <Link to="/foo">FOOO</Link>
        <Link to="/bar">BAR</Link>
        <div>{title}</div>
      </div>
    );
  }
}
