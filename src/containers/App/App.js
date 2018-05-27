import React, { Component } from 'react';
import Header from '../../components/App/Header';
import Menu from '../../components/App/Menu';
import renderRoutes from 'react-router-config/renderRoutes'
import { checkIfTokenValid } from "../../redux/modules/auth";
import {asyncConnect} from "redux-connect";
import { withCookies, Cookies } from 'react-cookie';

const cookies = new Cookies();

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    const cookies = new Cookies();
    const token = cookies.get('token');
    const user = cookies.get('user');

    if (token && user) {
      promises.push(dispatch(checkIfTokenValid(token, user))
        .then(() => {})
        .catch(() => {
          cookies.remove('token');
          cookies.remove('user');
        }));
    }

    return Promise.all(promises).then(() => {});
  }
}])
class App extends Component {
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
          <Menu />
          <div className="content">
            {this.props.children}
            {renderRoutes(route.routes)}
          </div>
          <div className="right-content">FRIEND SUGGESTION</div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
