import React, { Component } from "react";
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous" },
      currentlyOnline: 0,
      messages: []
    };
  }

  componentDidMount() {
    //server
    this.connectSocket = new WebSocket("ws://0.0.0.0:3001");

    this.connectSocket.onmessage = (e) => {
      let parsedMessage = JSON.parse(e.data)
      console.log(parsedMessage, "Parsed Message")
      
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
        
      } else if (parsedMessage.type === "username"){
        console.log("received change username")
        let newMessage = {
          id: parsedMessage.id,
          oldUsername: parsedMessage.oldUsername,
          newUsername: parsedMessage.newUsername,
          type: parsedMessage.type
        }

        newMessage.notification = `${newMessage.oldUsername} has changed their username to ${newMessage.newUsername}`
        const updatingMessages = this.state.messages.slice()
        updatingMessages.push(newMessage)
        
        this.setState({
          messages: updatingMessages
        });

      } else if (parsedMessage.type === "connection"){
        this.setState({
          currentlyOnline: parsedMessage.data
        })
      }
    }
      
  }

  sendUsername = usernameInput => {
    // const currentUser = [...this.state.currentUser];
    // currentUser.name = usernameInput;
    const usernameObj = {
      type: "username",
      oldUsername: this.state.currentUser.name,
      newUsername: usernameInput
    }
    
    this.state.currentUser.name = usernameInput
    this.connectSocket.send(JSON.stringify(usernameObj))
    
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
  };

  render() {
    return (
      <div>
        <Navbar usersOnline={this.state.currentlyOnline} />
       
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
