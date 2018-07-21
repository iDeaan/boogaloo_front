import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class MenuItem extends PureComponent {
  static propTypes = {
    linkTo: PropTypes.string,
    text: PropTypes.string,
    count: PropTypes.number
  };

  static defaultProps = {
    linkTo: '',
    text: '',
    count: 0
  };

  render() {
    const { linkTo, text, count } = this.props;
    return (
      <Link className="menu-item" to={linkTo}>
        <span className="text">{text}</span>
        {count && count > 0
          ? <span className="number">{count}</span>
          : ''
        }
      </Link>
    );
  }
}
