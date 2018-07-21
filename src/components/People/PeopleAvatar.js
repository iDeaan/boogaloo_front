import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { addNewFriend, deleteFriend } from '../../helpers/functions';
import {
  deleteFriend as deleteFriendFromStore,
  addFriend as addFriendToStore
} from '../../redux/modules/friends';

export default class FriendAvatar extends Component {
  static propTypes = {
    people: PropTypes.object,
    displayed: PropTypes.bool,
    isFriend: PropTypes.bool,
    token: PropTypes.string
  };

  static defaultProps = {
    people: {},
    displayed: false,
    token: ''
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleFriendAdd(people) {
    const { dispatch } = this.context.store;
    const { token } = this.props;

    addNewFriend(token, people.id).then(() => {
      dispatch(addFriendToStore(people.id));
    });
  }

  handleFriendDelete(people) {
    const { dispatch } = this.context.store;
    const { token } = this.props;

    deleteFriend(token, people.id).then(() => {
      dispatch(deleteFriendFromStore(people.id));
    });
  }

  render() {
    const { isFriend, people, displayed } = this.props;

    const avatarImage = people.images && people.images.find(image => image.image_type === 'avatar');

    require('./PeopleAvatar.scss');
    return (
      <div className={`people-avatar-container ${!displayed ? 'displayed' : 'hide'}`}>
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
            : <img />
          }
        </div>
        <div className="friend-initial">
          <div className="name">{people.name}</div>
          <div className="surname">{people.surname}</div>
        </div>
        <div className="friend-actions">
          {isFriend
            ? (
              <Button
                text="Видалити друга"
                className="register-button"
                onClick={() => this.handleFriendDelete(people)}
              />
            )
            : (
              <Button
                text="Додати до друзів"
                className="register-button"
                onClick={() => this.handleFriendAdd(people)}
              />
            )
          }
        </div>
      </div>
    );
  }
}
