import React, { PureComponent } from 'react';

export default class Html extends PureComponent {
  render() {
    return (
      <html>
      <head>
        <title>HTML</title>
      </head>
      <body>
        <div id="root">{this.props.children}</div>
        <script src="build.js" charSet="UTF-8" />
      </body>
      </html>
    );
  }
}
