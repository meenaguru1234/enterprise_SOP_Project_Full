import React, { useState } from 'react'
import { data } from 'react-router-dom';
// import OpenAI from "openai";

const Ask_ai = () => {

  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
// const [showpdf, setShowpdf] = useState([]);
// const [search, setSearch] = useState("");
// const [results, setResults] = useState("");

// 

// const searchWord = async () => {
//   const res = await fetch(`http://localhost:5000/${search}`);
//   const data = await res.json();
//   setResults(data);
// };


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const askAI = async (filename) => {
  const res = await fetch("http://localhost:5000/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      filename,
    }),
  });

  const data = await res.json();
  setAnswer(data.answer);
};

  return (
    <div>


    <div>
<input
  type="text"
  placeholder="Ask about this SOP..."
 style={{ color:'black'}}
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
/>
<button onClick={() => askAI(data.pdf)}>Ask AI</button>

{/* <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading... No file founded </span>
        </Spinner> */}

<p style={{color:"white"}}>{answer}</p>
    </div>







    </div>
  )
}

export default Ask_ai