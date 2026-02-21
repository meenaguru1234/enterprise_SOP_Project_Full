import ChatboxIcon from "./ChatboxIcon"
import "../CSS/askai.css"
import ChatForm from "./ChatForm"
import { useEffect, useRef, useState } from "react"
import ChatMessage from "./ChatMessage"
import {GoogleGenAI} from '@google/genai';
import OpenAI from "openai";

const Ask_ai = () => {

  const [chatHistory, setChatHistory] = useState([])
  const chatbodyRef= useRef(null)

  const generateBotResponse = async(history) =>{

    const updateHistory = (text) =>{
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role:"model", text}])
    }

 
      const contents = history.map(({role,text})=>(
        {
        role, 
        parts:[{text}]
      }
    ));

       const requestOptions =  {
           method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({contents})
      }

    try {

      // const response =   await fetch(import.meta.env.VITE_API_URL, requestOptions);
//       const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, requestOptions
// });

// const response = await openai.responses.create({
//   model: "gpt-4.1-mini",
//   input: `Write a professional SOP for: ${title}`
// });

// console.log(response.output[0].content[0].text);
  const res = await authAxios.post("http://localhost:5000/generate-sop", {
    title,
    description
  });

  setOutput(res.data.result);
   
      const data = await res.json();
      if(!res.ok) throw new Error(data.error.message || "Something Went Wrong")
      console.log(data);

    //         const botReply =
    //   data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    // setChatHistory(prev =>
    //   prev.slice(0, -1).concat({ role: "model", text: botReply })
    // );

    const apiResponstText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    updateHistory(apiResponstText)

    } catch (error) {

      console.log(error);
      
    }

  }

  

  useEffect(()=>{
      chatbodyRef.current
  },[chatHistory])


  return  <div className="body-container">
  <div className="container">
    <div className="chatbox-popup">
      {/* chat box header */}
      <div className="chat-header">
        <div className="header-info">
          <ChatboxIcon/>
          <h2 className="logo-text">Chatbox</h2>
        </div>
        <button className="material-symbols-rounded">
              keyboard_arrow_down
              </button>
      </div>

      {/* chat box body */}

      <div ref={chatbodyRef} className="chat-body">
        <div className="message bot-message">
          <ChatboxIcon/>
          <p className="message-text">
            Hey there, <br/>How can I help you today?
          </p>
        </div>

 {/* render the chat history dynamically */}
    {chatHistory.map((chat,index)=>(
      <ChatMessage key={index} chat={chat}/>
    ))}

      
      </div>

      {/* chat box Footer */}

    <div className="chat-footer">
       <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
    </div>


    </div>


</div>

    </div>
  
}

export default Ask_ai