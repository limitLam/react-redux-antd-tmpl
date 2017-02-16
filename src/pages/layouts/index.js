/*
	layout主页面
*/
import Header from './Common/header';
import Footer from './Common/footer';

import React from 'react';

export default class Layout extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-frm">
        <Header />
        <div className="frame-wrap-bg">
          <div className="frame-wrap">
            {/* 主内容区 */}
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}