import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Message extends PureComponent {
  static propTypes = {
    currentUserId: PropTypes.number,
    currentChatUsers: PropTypes.array,
    currentUserData: PropTypes.object,
    isToShowUserInitials: PropTypes.bool,
    message: PropTypes.object
  };

  static defaultProps = {
    currentUserId: 0,
    currentChatUsers: [],
    currentUserData: {},
    isToShowUserInitials: true,
    message: {}
  };

  render() {
    const {
      message, currentUserId, currentChatUsers, currentUserData, isToShowUserInitials
    } = this.props;

    let userAvatar = null;
    let currentUser = null;

    if (message.user_id !== currentUserId) {
      currentUser = currentChatUsers.find(user => user.id === message.user_id);
    } else {
      currentUser = currentUserData;
    }

    userAvatar = currentUser && currentUser.images
      && currentUser.images.find(image => image.image_type === 'avatar');

    if (!currentUser) {
      return (
        <div />
      );
    }

    return (
      <div className="message-item">
        <div className="left-part">
          {isToShowUserInitials
            ? (
              <div className="user-avatar">
                {userAvatar
                  ? (
                    <div className="avatar-image">
                      {userAvatar.absolute_href
                        ? <img src={userAvatar.absolute_href} alt="avatar" />
                        : <img src={userAvatar.href} alt="avatar" />
                      }
                    </div>
                  )
                  : (
                    <div className="avatar-image">
                      <img src="/img/no_image.png" alt="avatar" />
                    </div>
                  )
                }
              </div>
            )
            : ''
          }
        </div>
        <div className="right-part">
          {isToShowUserInitials
            ? <div className="user-information">{currentUser.name} {currentUser.surname}</div>
            : ''
          }
          <div className="message">
            {message.message}
          </div>
        </div>
      </div>
    );
  }
}
