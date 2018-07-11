import React, { Component } from "react";

// class Message extends Component {
//   render() {
    
//   }
// }
// export default Message;

export default function Message(props) {
  return (
    <div className="message">
      <span className="message-username">
        {props.msg.username}
      </span>
      <span className="message-content">
        {props.msg.content}
      </span>
    </div>
  );
}
