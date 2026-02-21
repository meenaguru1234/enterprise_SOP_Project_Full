import React from 'react'
import ChatboxIcon from './ChatboxIcon'

const ChatMessage = ({chat}) => {
  return (
    
    
      <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
          {chat.role === "model" && <ChatboxIcon/>}
          <p className="message-text">{chat.text} </p>
        </div>
  )
}

export default ChatMessage