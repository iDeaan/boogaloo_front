import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';

export default class FriendAvatar extends Component {
  static propTypes = {
    people: PropTypes.object,
    displayed: PropTypes.bool,
    isFriend: PropTypes.bool,
  };

  static defaultProps = {
    people: {},
    displayed: false,
  };

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
                onClick={() => console.log('delete clcik')}
              />
            )
            : (
              <Button
                text="Додати до друзів"
                className="register-button"
                onClick={() => console.log('delete clcik')}
              />
            )
          }
        </div>
      </div>
    );
  }

}
