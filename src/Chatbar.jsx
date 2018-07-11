import React, { Component } from "react";

class Chatbar extends Component {
  constructor(props){
    super(props)
    this.state = { defaultValue : props };
  }
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.state.defaultValue.name}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default Chatbar;
