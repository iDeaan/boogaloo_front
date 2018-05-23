import React, { Component } from 'react';

import { loadUserFriendsIds } from "../../redux/modules/friends";
import {asyncConnect} from "redux-connect";
import authenticated from "../../helpers/authenticated";

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {

    const userId = getState().auth.registeredUser.userToken.user_id;
    const promises = [];

    promises.push(dispatch(loadUserFriendsIds(userId)));

    return Promise.all(promises).then(() => {});
  }
}])
@authenticated
export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginSelected: true
    }
  }

  render() {
    const { isLoginSelected } = this.state;

    require('./Friends.scss');
    return (
      <div className={`friends-container route-container`}>
        FRIENDS
      </div>
    );
  }
}
