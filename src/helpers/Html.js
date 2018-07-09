import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

export default class Html extends PureComponent {
  static propTypes = {
    store: PropTypes.object
  };

  static defaultProps = {
    store: {}
  };

  render() {
    const { store } = this.props;

    return (
      <html>
      <head>
        <title>HTML</title>
      </head>
      <body>
        <div id="root">{this.props.children}</div>
        <script src="dlls/vendor.dll.js" charSet="UTF-8" />
        <script src="build.js" charSet="UTF-8" />
        <script src="http://localhost:35729/livereload.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
      </body>
      </html>
    );
  }
}
