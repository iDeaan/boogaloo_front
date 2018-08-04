import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntervalRenderChildren from './IntervalRenderChildren';

export default class IntervalRender extends Component {
  static propTypes = {
    children: PropTypes.array,
    renderInterval: PropTypes.number, // eslint-disable-line
    containerClassName: PropTypes.string,
    childrenClassName: PropTypes.string,
    transitionStyle: PropTypes.object
  };

  static defaultProps = {
    children: [],
    renderInterval: 500, // eslint-disable-line
    containerClassName: '',
    childrenClassName: '',
    transitionStyle: {}
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      displayedItemIndex: 0
    };
  }

  componentDidMount() {
    this.startIntervalRender(this.props);
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
      if (this.times <= childrenCount) {
        this.setState({ displayedItemIndex: this.times === 0 ? 0 : this.state.displayedItemIndex + 1 });
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
