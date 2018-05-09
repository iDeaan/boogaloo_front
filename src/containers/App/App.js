import React, { Component } from 'react';
import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';
import renderRoutes from 'react-router-config/renderRoutes'
import './App.scss';
import {signIn} from "../../redux/modules/auth";
import {asyncConnect} from "redux-connect";

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {

    console.log('in async connect');

    const promises = [];

    promises.push(dispatch(signIn()));

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
    // require('./App.scss');
    const { route } = this.props;
    return (
      <div className="app-container">
        <button onClick={() => this.handleClick()}>SUBMIT</button>
        <button
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          HOVER ME!
        </button>
        {this.state.hovered
          ? (
            <h2>HOVIE</h2>
          )
          : ''
        }
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
