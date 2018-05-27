import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../AdditionalComponents/Button';

export default class FriendAvatar extends Component {
  static propTypes = {
    friend: PropTypes.object
  };

  static defaultProps = {
    friend: {}
  };

  render() {
    const { friend } = this.props;

    const avatarImage = friend.images && friend.images.find(image => image.image_type === 'avatar');

    require('./FriendAvatar.scss');
    return (
      <div className="friend-avatar-container">
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
            onClick={() => console.log('delete clcik')}
          />
        </div>
      </div>
    );
  }

}
