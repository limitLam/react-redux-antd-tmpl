/*
  公用底部
*/
import React from 'react';

export default class footer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>底部</div>
    );
  }
}




