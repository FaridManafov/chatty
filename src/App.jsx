import React, { Component } from "react";
import Chatbar from "./Chatbar.jsx";
// import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [
        {
          type: "incomingMessage",
          content:
            "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom"
        },
        {
          type: "incomingMessage",
          content:
            "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          type: "incomingMessage",
          content:
            "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny"
        }
      ]
    };
  }

  componentDidMount() {
    //server
    this.connectSocket = new WebSocket("ws://0.0.0.0:3001");

    this.connectSocket.onopen = function() {
      this.connectSocket.send("Testing message from App");
      console.log("sending message");
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

    this.connectSocket.send("sending from send message")
    messages.push({
      username: this.state.currentUser.name,
      content: msgContent
    });

    this.setState({
      messages: messages
    });
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
