import React, { useEffect, useRef, useState } from 'react'
import "./voiceChat.css"
import { Mic } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Send } from 'lucide-react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Spinner from '../../Component/spinner/Spinner';
import Loader1 from '../../Component/loader1/Loader1';
import ChatBox from './ChatBox';
import ChatBoxLoader from './ChatBoxLoader';
import VoiceSelector from '../../Component/voiceSelector/VoiceSelector';
import axios from 'axios';
const synth = window.speechSynthesis;
// Google US English en-US 158
// Google UK English Female en-GB 159
// Google UK English Male en-GB 160



function VoiceChat() {
  const scrollRef = useRef()
  const [msgValue, set_msgValue] = useState("")
  const [micstatus, set_micstatus] = useState(true)
  const [sendStatus, set_sendStatus] = useState(true)
  const [menuStatus, set_menuStatus] = useState(false)
  const [botReplying, set_botReplying] = useState(false)
  const [autoPlay, set_autoPlay] = useState({
    status: false,
    index: -1
  })
  const [chatHistory, set_chatHistory] = useState([
    {
      role: "user",
      parts: [{ text: "You are a helpful assistant. Your task is to help me practice and improve my communication skills. I will talk with you as a real person, and you just have to reply to me so that we can have a continuous conversation. Ignore my incorrect grammar while we converse." }],
    },
    {
      role: "model",
      parts: [{ text: "Sounds great! I'm happy to be your practice partner. Feel free to chat about anything you'd like - current events, hobbies, plans for the weekend, or even something you're passionate about. Let's get this conversation flowing!  What's on your mind today?" }],
    },
  ])
  const initialBotMsg = "I'm happy to be your practice partner. Feel free to chat about anything you'd like - current events, hobbies, plans for the weekend, or even something you're passionate about. Let's get this conversation flowing!  What's on your mind today?"

  const [play1, set_play1] = useState(-1)
  const [play2, set_play2] = useState(-1)

  const msgBoxRef = useRef(null)

  // if (!synth)
  //   console.log("xxxxxxxxxxxxxxx");
  let {
    transcript,
    interimTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (msgBoxRef?.current) {
      msgBoxRef.current.style.height = "100%";
      const scrollHeight = msgBoxRef?.current?.scrollHeight;
      msgBoxRef.current.style.height = scrollHeight + "px";
    }
  }, [msgBoxRef, msgValue])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [chatHistory])

  const [prevTranscript, set_PrevTranscript] = useState("")
  useEffect(() => {

    if (transcript) set_msgValue(msgValue + " " + transcript.slice(prevTranscript.length, transcript.length).trim())
    set_PrevTranscript(transcript)
  }, [transcript])

  useEffect(() => {
    msgBoxRef.current.focus();
  }, [])
  



  const handle_msgChange = (e) => {
    set_msgValue(e.target.value)
  }

  const handle_sendMsg = async (e) => {
    if(msgValue.trim() === ""){ 
      alert("please say somthing")
      return
    }
    if(!micstatus){
      SpeechRecognition?.stopListening()
      set_micstatus(true)
    }


    let arr = [
      ...chatHistory,
      {
        role: "user",
        parts: [{ text: msgValue }],
      }
    ]
    set_chatHistory(arr)
    const body = {
      history: chatHistory,
      msg: msgValue
    }
    set_botReplying(true)
    await axios.post(process.env.REACT_APP_BASE_URL+"/api/v1/bot/voicechat/geminai", body).then((res)=>{
      console.log(res.data);
      if(res.data.success === true){
        let resText = res.data.result.text
        let newText = ""
        for(let i=0; i< resText.length; i++){
          if(resText[i] === "*" && resText[i+1] === "*")
            i=i+1
          else
            newText += resText[i]
        }
        arr = [
          ...arr,
          {
            role: "model",
            parts: [{ text: newText }],
          }
        ]
        set_autoPlay({
          status: true,
          index: arr.length
        })
        //set_play1(arr.length) not working
        set_msgValue("")
        set_botReplying(false)
      }
      
      
    }).catch((err)=>{
      set_botReplying(true)
      console.error(err);
    }).finally(()=>{
      // set_botReplying(false)
    })
    // set_botReplying(false)
    set_chatHistory(arr)
    msgBoxRef?.current?.focus();
    
  }

  const handle_menu = (e) => {
    set_menuStatus(!menuStatus)
  }


  const handle_micClick = () => {

    if (micstatus) {
      SpeechRecognition.startListening({ continuous: true })
    } else {
      SpeechRecognition.stopListening()
    }
    set_micstatus(!micstatus)
  }


  

  return (
    <div className='voice-chat'>
      <div className='vc-chat-wp'>
        {
          chatHistory?.map((item, index) => (
            index >= 1 && <ChatBox key={index} 
            type={item.role} 
            text={index === 1 ? initialBotMsg : item.parts[0].text}
            index={index}
            play1={play1}
            play2={play2}
            set_play1={set_play1}
            set_play2={set_play2} 
            chatLength={chatHistory.length}
            autoPlay={autoPlay}
            set_autoPlay={set_autoPlay}
            />
          ))
        }
{botReplying && <ChatBoxLoader ref={scrollRef} />}
      </div>
      <div className='vc-controller-wp'>
        <div className='vc-msg-box-wp'>
          {browserSupportsSpeechRecognition ?
            <textarea  rows={1} onChange={handle_msgChange} value={msgValue} ref={msgBoxRef} placeholder='Type your message...' className='vc-msg-box'></textarea>
            : <p>Your browser does not Supports SpeechRecognition</p>}
        </div>

        {menuStatus ? 
        <div onClick={handle_menu} className='vc-send-wp'>
          <span className="material-symbols-outlined">
            more_vert
          </span> 
        </div>:
        <div className='menu-list-wp'>

          <div onClick={handle_menu} className='vc-menu-wp-onOpen'>
            <span className="material-symbols-outlined">
              more_vert
            </span>
          </div>
          
          <div onClick={handle_micClick} className='vc-mic-wp'>
            {micstatus ? <Mic /> : <Pause />}
          </div>

          <div onClick={handle_sendMsg} className='vc-send-wp'>
            {<Send />}
          </div>

          {/* <div onClick={()=>synth.pause()} className='vc-send-wp'>
            P
          </div>

          <div onClick={()=>synth.resume()} className='vc-send-wp'>
            R
          </div> */}
          
        
        </div>}
        
      </div>
    </div>
  )
}

export default VoiceChat