import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideNotification } from "../../redux/modules/notifications";

@connect(
  state => ({
    notifications: state.notifications
  })
)
export default class NotificationsContainer extends PureComponent {
  static propTypes = {
    notifications: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.context.store;

    const { notifications } = this.props;
    const { notifications: nextNotifications } = nextProps;

    const { showNewNotification } = notifications;
    const { showNewNotification: nextShowNewNotification, displayTime } = nextNotifications;

    if ((showNewNotification !== nextShowNewNotification) && nextShowNewNotification) {
      setTimeout(() => {
        dispatch(hideNotification());
      }, displayTime);
    }
  }

  render() {
    const { notifications } = this.props;
    const { showNewNotification, notificationDOM } = notifications;

    require('./Notifications.scss');
    return (
      <div className={`notifications-container ${showNewNotification ? 'displayed' : ''}`}>
        <div className="notifications-content">
          <div className={`notification ${showNewNotification ? 'displayed' : ''}`}>
            {showNewNotification
              ? (
                <div className="notification-content">
                  {notificationDOM}
                </div>
              ) : ''
            }
          </div>
        </div>
      </div>
    );
  }
}
