import React, { Component } from 'react';
import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';
import renderRoutes from 'react-router-config/renderRoutes'
import {signIn} from "../../redux/modules/auth";
import {asyncConnect} from "redux-connect";

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!getState().auth.signed) {
      promises.push(dispatch(signIn()));
    }

    return Promise.all(promises).then(() => {});
  }
}])
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
      hovered: false
    }
  }

  handleClick() {
    console.log('handleClick');
    const { clicked } = this.state;
    this.setState({ clicked: clicked + 1 });
  }

  handleMouseEnter() {
    const { hovered } = this.state;
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    const { hovered } = this.state;
    this.setState({ hovered: false });
  }

  render() {
    require('./App.scss');
    const { route } = this.props;
    return (
      <div className="app-container">
        <Header />
        <div className="app-content">
          <Menu title={`Тестовий312 props ${this.state.clicked}`} />
          <div className="content">
            {this.props.children}
            {renderRoutes(route.routes)}
          </div>
        </div>
      </div>
    );
  }
}
