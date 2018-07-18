import React, { Component } from "react";
import Message from "./Message.jsx"

export default function MessageList(props) {
  let messages = props.messages.map((msg) => {
    return (
        <Message msg = {msg}/>
    )
  })
  return (
    <div>
      {messages}
    </div>
  )
}

