import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';
import { addNewFriend, deleteFriend } from '../../helpers/functions';
import {
  deleteFriend as deleteFriendFromStore,
  addFriend as addFriendToStore,
  deleteFiendFromSubscription
} from '../../redux/modules/friends';

export default class PeopleAvatar extends Component {
  static propTypes = {
    people: PropTypes.object,
    displayed: PropTypes.bool,
    isFriend: PropTypes.bool,
    isNotAcceptedFriend: PropTypes.bool,
    token: PropTypes.string
  };

  static defaultProps = {
    people: {},
    displayed: false,
    isFriend: false,
    isNotAcceptedFriend: false,
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

  handleDeleteSubscription(people) {
    const { dispatch } = this.context.store;
    const { token } = this.props;

    dispatch(deleteFiendFromSubscription(token, people.id));
  }

  render() {
    const {
      isFriend, people, displayed, isNotAcceptedFriend
    } = this.props;

    const avatarImage = people.images && people.images.find(image => image.image_type === 'avatar');

    require('./PeopleAvatar.scss');
    return (
      <div className={`people-avatar-container ${!displayed ? 'displayed' : 'hide'}`}>
        <div className="friend-avatar">
          {avatarImage
            ? (
              <div className="friend-image">
                {avatarImage.absolute_href
                  ? <img src={avatarImage.absolute_href} alt="avatar" />
                  : <img src={avatarImage.href} alt="avatar" />
                }
              </div>
            )
            : <img alt="no-avatar" />
          }
        </div>
        <div className="friend-initial">
          <div className="name">{people.name}</div>
          <div className="surname">{people.surname}</div>
        </div>
        {isNotAcceptedFriend
          ? (
            <div className="friend-actions">
              <div className="you-subscribed">Ви підписані</div>
              <div
                className="delete-subscription"
                onClick={() => this.handleDeleteSubscription(people)}
              >
                відписатись
              </div>
            </div>
          ) : (
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
          )
        }
      </div>
    );
  }
}
