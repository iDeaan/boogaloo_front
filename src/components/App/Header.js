import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increment } from '../../redux/modules/counter';
import { signIn } from '../../redux/modules/auth';
import { asyncConnect } from 'redux-connect';

// @asyncConnect([{
//   promise: ({ store: { dispatch, getState } }) => {
//     const promises = [];
//
//     promises.push(dispatch(signIn()));
//
//     return Promise.all(promises).then(() => {});
//   }
// }])
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

  componentWillMount() {
    const { dispatch } = this.context.store;
    console.log('componentWillMount');
    // dispatch(signIn());
  }

  render() {
    const { counter } = this.props;
    const { dispatch } = this.context.store;
    const { userInformation } = this.props;

    require('./Header.scss');
    return (
      <header className="app-header">
        <div className="logo">
          Boogaloo {counter}
        </div>
        <div className="header-actions">
          <div className="search" onClick={() => dispatch(increment())}>
            fsdfds
          </div>
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
