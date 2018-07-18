import React, {Component} from 'react'

export default function Navbar(p){
  // console.log(p)
  return (
    // <nav className="online-status">
    // <span>
    //   Users Online: {p.usersOnline}
    // </span>
    // </nav>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span>
        Users Online: {p.usersOnline}
      </span>
    </nav>
  )
}