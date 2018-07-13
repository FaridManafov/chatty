import React, { Component } from "react";

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  sendUsername= e => {
    if (e.key === "Enter") {
      let usernameInput = e.target.value;
      this.props.sendUsername(usernameInput);
    }
  };

  sendMessage = e => {
    if (e.key === "Enter") {
      let messageInput = e.target.value;
      this.props.sendMessage(messageInput);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          // defaultValue={this.state.defaultValue.name}
          onKeyPress={this.sendUsername}
          // change this top one so it can update the
          // username after
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.sendMessage}
        />
      </footer>
    );
  }
}
export default Chatbar;
