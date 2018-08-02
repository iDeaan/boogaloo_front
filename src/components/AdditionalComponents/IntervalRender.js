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
      childrenItems: this.addClassNamesForChildrenItems(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    const { children: nextChildren } = nextProps;

    if (children.length !== nextChildren.length) {
      this.setState({ childrenItems: this.addClassNamesForChildrenItems(nextProps) });
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
    }, renderInterval);
  }

  addClassNamesForChildrenItems(props) {
    const { children } = props;

    return React.Children.map(children, (child, index) => {
      const oldChildProps = child.props;
      const newClassName =
        `${child.props && child.props.className ? `${child.props.className} ` : ''}interval-render-item`;

      const props = {
        ...oldChildProps,
        className: newClassName,
        currentIndex: index
      };

      return React.createElement(child.type, props, child.props.children);
    });
  }

  returnIfToRenderItem(child) {
    const { displayedItemIndex } = this.state;
    if (child.props.currentIndex <= displayedItemIndex) {
      return child;
    }
    return null;
  }

  render() {
    const { childrenItems } = this.state;

    return (
      <div className="interval-render-container">
        {React.Children.map(childrenItems, child => this.returnIfToRenderItem(child))}
      </div>
    );
  }
}
