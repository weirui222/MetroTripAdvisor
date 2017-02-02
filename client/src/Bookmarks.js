import React, { Component } from 'react';
import Bookmark from './Bookmark';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

 render() {
   return (
    <div>
      <h1>Bookmarks </h1>
      {this.results()}
    </div>
   );
  }

 results() {
  return this.state.results.map(result =>
    <Bookmark nickname={result.nickname}
              bus={result.bus}
              stop={result.stop} />
    );
  }
}

export default Bookmarks;
