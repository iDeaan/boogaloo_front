import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IntervalRender extends Component {
  static propTypes = {
    children: PropTypes.array,
    renderInterval: PropTypes.number
  };

  static defaultProps = {
    children: [],
    renderInterval: 500
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.startIntervalRender(props);

    this.state = {
      displayedItemIndex: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    const { children: nextChildren } = nextProps;

    if (children.length !== nextChildren.length) {
      this.startIntervalRender(nextProps);
    }
  }

  startIntervalRender(props) {
    const { renderInterval, children } = props;
    const childrenCount = React.Children.count(children);

    this.times = 0;

    this.interval = setInterval(() => {
      if (this.times < childrenCount) {
        this.setState({ displayedItemIndex: this.state.displayedItemIndex + 1 });
        this.times += 1;
      }
    }, renderInterval - 100);
  }

  returnIfToRenderItem(child, currentIndex) {
    const { displayedItemIndex } = this.state;
    if (currentIndex <= displayedItemIndex) {
      return (
        <IntervalRenderChildren
          currentIndex={currentIndex}
        >
          {child}
        </IntervalRenderChildren>
      );
    }
    return null;
  }

  render() {
    const { children: childrenItems } = this.props;

    return (
      <div className="interval-render-container">
        {React.Children.map(childrenItems, (child, index) => this.returnIfToRenderItem(child, index))}
      </div>
    );
  }
}

class IntervalRenderChildren extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  static defaultProps = {
    children: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      className: null
    };
  }

  componentDidMount() {
    setTimeout(() =>
      this.setState({ className: 'transitioned' })
    , 100);
  }

  render() {
    const { children: child } = this.props;
    const { className } = this.state;

    return (
      <div className={`interval-render-item ${className}`}>
        {child}
      </div>
    );
  }
}
