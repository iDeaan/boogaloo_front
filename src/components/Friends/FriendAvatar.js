import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { deleteFriend } from '../../helpers/functions';
import {
  deleteFriend as deleteFriendFromStore
} from "../../redux/modules/friends";

export default class FriendAvatar extends Component {
  static propTypes = {
    friend: PropTypes.object,
    displayed: PropTypes.bool,
    token: PropTypes.string
  };

  static defaultProps = {
    friend: {},
    displayed: false,
    token: ''
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleFriendDelete(people) {
    const { dispatch } = this.context.store;
    const { token } = this.props;

    deleteFriend(token, people.id).then(() => {
      dispatch(deleteFriendFromStore(people.id));
    });
  }

  render() {
    const { friend, displayed } = this.props;

    const avatarImage = friend.images && friend.images.find(image => image.image_type === 'avatar');

    require('./FriendAvatar.scss');
    return (
      <div className={`friend-avatar-container ${displayed ? 'displayed' : 'hide'}`}>
        <div className="friend-avatar">
          {avatarImage
            ? (
              <div className="friend-image">
                {avatarImage.absolute_href
                  ? <img src={avatarImage.absolute_href} />
                  : <img src={avatarImage.href} />
                }
              </div>
            )
            : (
              <div className="friend-image">
                <img src="/img/no_image.png" />
              </div>
            )
          }
        </div>
        <div className="friend-initial">
          <div className="name">{friend.name}</div>
          <div className="surname">{friend.surname}</div>
        </div>
        <div className="friend-actions">
          <Button
            text="Написати повідомлення"
            className="register-button"
            onClick={() => console.log('message clcik')}
          />
          <Button
            text="Видалити друга"
            className="register-button"
            onClick={() => this.handleFriendDelete(friend)}
          />
        </div>
      </div>
    );
  }

}
