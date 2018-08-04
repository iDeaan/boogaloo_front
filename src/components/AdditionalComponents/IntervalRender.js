import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IntervalRender extends Component {
  static propTypes = {
    children: PropTypes.array,
    renderInterval: PropTypes.number,
    containerClassName: PropTypes.string,
    childrenClassName: PropTypes.string,
    transitionStyle: PropTypes.object
  };

  static defaultProps = {
    children: [],
    renderInterval: 500,
    containerClassName: '',
    childrenClassName: '',
    transitionStyle: {}
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
    }, renderInterval - 200);
  }

  returnIfToRenderItem(child, currentIndex) {
    const { childrenClassName, transitionStyle } = this.props;
    const { displayedItemIndex } = this.state;

    if (currentIndex <= displayedItemIndex) {
      return (
        <IntervalRenderChildren
          currentIndex={currentIndex}
          childrenClassName={childrenClassName}
          transitionStyle={transitionStyle}
        >
          {child}
        </IntervalRenderChildren>
      );
    }
    return null;
  }

  render() {
    const { children: childrenItems, containerClassName } = this.props;

    return (
      <div className={`interval-render-container${containerClassName ? ` ${containerClassName}` : ''}`}>
        {React.Children.map(childrenItems, (child, index) => this.returnIfToRenderItem(child, index))}
      </div>
    );
  }
}

class IntervalRenderChildren extends Component {
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
    setTimeout(() =>
      this.setState({ className: 'transitioned' })
    , 200);
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
