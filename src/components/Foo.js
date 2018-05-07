import React, { PureComponent } from 'react';

export default class Foo extends PureComponent {
  handleClick() {
    console.log('clicked');
  }


  render() {
    // require('./Foo.scss');
    return (
      <div className="foo-container">
        <img src="/img/2.png" />
        <h1>А12312321</h1>
        <p>SOME TEXT SOME TEXTSOME TEXT SOME TEXTSOME TEXTSOME TEXT</p>
        <button onClick={() => this.handleClick()}>CLICK</button>
      </div>
    );
  }
}
