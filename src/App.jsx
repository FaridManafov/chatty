import React, { Component } from "react";
import Chatbar from "./Chatbar.jsx";
// import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous" },
      messages: []
    };
  }

  componentDidMount() {
    //server
    this.connectSocket = new WebSocket("ws://0.0.0.0:3001");

    this.connectSocket.onmessage = (e) => {
      let parsedMessage = JSON.parse(e.data)
      console.log(parsedMessage)
    }
  }

  sendUsername = usrContent => {
    const currentUser = [...this.state.currentUser];
    currentUser.name = usrContent;
    this.setState({
      currentUser: currentUser
    });
  };

  // need to define this in app to update the state
  sendMessage = msgContent => {
    const messages = [...this.state.messages];

    const messageObj = {
      type: "message",
      data: {
        username: this.state.currentUser.name,
        content: msgContent
      }
    };
    // messages.push({
    // });

    this.setState({
      messages: messages
    });

    this.connectSocket.send(JSON.stringify(messageObj));
    console.log(msgContent);
  };

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <Chatbar
          name={this.state.currentUser.name}
          sendUsername={this.sendUsername}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

export default App;
// onKeyPress = {}/>
