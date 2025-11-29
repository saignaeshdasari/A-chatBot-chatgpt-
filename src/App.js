import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './App.css'
import gptlogo from './assets/chatgpt.svg';
import addbtn from './assets/add-30.png';
import msgicon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import pro from './assets/rocket.svg';
import sendicon from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import botIcon from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './OpenAI';

const App = () => {
  const msgEnd = useRef(null);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([
    {
    text: "Hi I am chatgpt how can assit you?",
    isBot:true,
   }
]); 
useEffect(()=>{
  msgEnd.current.scrollIntoView();
},[messages]);


const handlesend =async () => {
  const text = input;
  setInput('');
  setMessages([
    ...messages,
    {text,isBot:false}
  ])
  const res = await sendMsgToOpenAI(input);
  setMessages([...messages,
    {text,isBot:false},
    {text:response,isBot:true}
  ])
  console.log(res);
}

  return (
    <div className="app">

      <div className="sidebar">

        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptlogo} alt="logo" className="logo" />
            <span className="brand">chatGPT</span>

            <button className="midBtn">
              <img src={addbtn} alt=" new chat" className="addbtn" />
              New Chat
            </button>
          </div>

          <div className="upperSideBottom">
            <button className="query">
              <img src={msgicon} alt="Query" />
              What is Programming ?
            </button>

            <button className="query">
              <img src={msgicon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="ListItemImage" />
            Home
          </div>

          <div className="listItems">
            <img src={saved} alt="" className="ListItemImage" />
            Saved
          </div>

          <div className="listItems">
            <img src={pro} alt="" className="ListItemImage" />
            Upgrade to Pro
          </div>
        </div>

      </div>


      <div className="main">
        <div className="chats">
    { messages.map((message,i)=>{
      return <div key={i} className={message.isBot?"chat bot":"chat"}>
          <img className='chatimg' src={message.isBot?botIcon:userIcon} alt="" />
        </div>   
    })}
    <div ref={msgEnd}/>
</div>
        <div className="chatfooter">
          <div className="inp">
            <input type="text" placeholder='Ask anything!' value={input} onChange={(e) => {setInput(e.target.value)}} />
            <button className='send' onClick={handlesend}>
              <img src={sendicon} alt="send" />
            </button>
            
          </div>
          <p>ChatGPT may give you incorrect solution ! Make sure you cross check check it !..</p>
        </div>

      </div>

    </div>
  )
}

export default App
