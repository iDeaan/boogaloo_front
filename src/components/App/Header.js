import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { increment } from '../../redux/modules/counter';

@connect(
  state => ({
    counter: state.counter.count
  })
)
export default class Header extends PureComponent {
  static propTypes = {
    counter: PropTypes.number
  };

  static defaultProps = {
    counter: 'fff'
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { counter } = this.props;
    const { dispatch } = this.context.store;

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
      </header>
    );
  }
}
