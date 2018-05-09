import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect(
  state => ({
    counter: state.counter.count,
    userInformation: state.auth.data
  })
)
export default class Header extends PureComponent {
  static propTypes = {
    counter: PropTypes.number,
    userInformation: PropTypes.object,
  };

  static defaultProps = {
    counter: 'fff',
    userInformation: {}
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { userInformation } = this.props;

    require('./Header.scss');
    return (
      <header className="app-header">
        <div className="logo">
          Boogaloo
        </div>
        <div className="user-actions">
          <div className="user-name">
            {userInformation && userInformation.user
              ? userInformation.user.name
              : 'NoName'
            }
          </div>
        </div>
      </header>
    );
  }
}
