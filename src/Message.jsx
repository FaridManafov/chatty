import React, { Component } from "react";

// class Message extends Component {
//   render() {
    
//   }
// }
// export default Message;

export default function Message(props) {
  console.log(props)
  if (props.msg.type === "message"){
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

  if (props.msg.type === "username"){
    return (
      <div className="username">
        <span className="usernameContent">
          {props.msg.notification}
        </span>
      </div>
    )
  }
}
