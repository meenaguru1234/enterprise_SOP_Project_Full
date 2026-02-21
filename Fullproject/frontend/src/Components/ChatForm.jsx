import React, { useRef } from 'react'


const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    const inputref = useRef()

const handleFormSubmit = (e) =>{
    e.preventDefault()
    const userMessage =inputref.current.value.trim();
    if (!userMessage) return;
        inputref.current.value = ""

    console.log(userMessage);
    // Update a chat history with the user's message
    setChatHistory((history) =>[...history, {role:"user", text:userMessage}])

     // add a "thinking ..." placeholder  for the bot's     response
    setTimeout(()=>
    setChatHistory((history) =>[...history, {role:"model", text:"Thinking..."}]), 600)
    generateBotResponse([...chatHistory, {role:"user", text:userMessage}]);
}



  return (
    <form action="" className="chat-form" onSubmit={handleFormSubmit}>

          <input ref={inputref} style={{color:'Black'}} type="text" placeholder="Message..." class="message-input" required/>
 <button className="material-symbols-rounded">
              arrow_upward
              </button>

        </form>
  )
}

export default ChatForm