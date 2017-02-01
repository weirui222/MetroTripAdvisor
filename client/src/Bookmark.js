import React, { Component } from 'react';

class Bookmark extends Component {
 render() {
   return (
    <div>
      <div className="container">
        <div> {this.props.nickname} <button onClick={() => this.editNickname(this.props.id.nickname)} className="btn btn-primary">Edit Nickname</button></div>
        <div> {this.props.bus} </div>
        <div> {this.props.stop}</div>
        <button onClick={() => this.deleteBookmark(this.props.id)} className="btn btn-primary">Remove from Bookmarks</button>
      </div>
    </div>
   );
 }
}

export default Bookmark;
