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
    
    this.connectSocket.onopen = () => {
      console.log("sending message");
      this.connectSocket.send("Testing message from App");
      // this.connectSocket.send(JSON.stringify(msgContent))

    };

    //    this.connectSocket.onsomething = function() {
    

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {
    //     id: 3,
    //     username: "Michelle",
    //     content: "Hello there!"
    //   };
    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages });
    // }, 3000);
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
      username: this.state.currentUser.name,
      content: msgContent

    }
    // messages.push({
    // });
    
    this.setState({
      messages: messages
    });

    this.connectSocket.send(JSON.stringify(messageObj))
    console.log(msgContent)
    
    
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
