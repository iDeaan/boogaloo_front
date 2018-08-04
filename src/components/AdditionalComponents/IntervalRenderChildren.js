import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IntervalRenderChildren extends Component {
  static propTypes = {
    children: PropTypes.object,
    transitionStyle: PropTypes.object,
    childrenClassName: PropTypes.string
  };

  static defaultProps = {
    children: {},
    transitionStyle: {},
    childrenClassName: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      className: null
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ className: 'transitioned' }), 200);
  }

  render() {
    const { children: child, childrenClassName, transitionStyle } = this.props;
    const { className } = this.state;

    let itemStyle = transitionStyle.initial;
    if (className === 'transitioned') {
      itemStyle = { ...itemStyle, ...transitionStyle.transitioned };
    }

    return (
      <div
        className={`interval-render-item ${className}${childrenClassName ? ` ${childrenClassName}` : ''}`}
        style={itemStyle}
      >
        {child}
      </div>
    );
  }
}
