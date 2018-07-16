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
      console.log(parsedMessage, "parsedmsg")
      
      if (parsedMessage.type === "message") {
        let newMessage = {
          id: parsedMessage.id,
          username: parsedMessage.data.username,
          content: parsedMessage.data.content,
          type: parsedMessage.type
        }
        
        const updatingMessages = this.state.messages.slice()
        updatingMessages.push(newMessage)
        
        this.setState({
          messages: updatingMessages,
          mostRecentMessageID: newMessage.id
        })
      }
      if (parsedMessage.type === "username"){
        console.log("recieved change username")
      }
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
