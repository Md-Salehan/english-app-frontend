import React, { useEffect, useRef, useState } from 'react'
import "./voiceChat.css"
import { Mic } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Send } from 'lucide-react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Spinner from '../../Component/spinner/Spinner';
import Loader1 from '../../Component/loader1/Loader1';
import ChatBox from './ChatBox';
import VoiceSelector from '../../Component/voiceSelector/VoiceSelector';
const synth = window.speechSynthesis;
// Google US English en-US 158
// Google UK English Female en-GB 159
// Google UK English Male en-GB 160
function VoiceChat() {
  const [msgValue, set_msgValue] = useState("")
  const [micstatus, set_micstatus] = useState(true)
  const [sendStatus, set_sendStatus] = useState(true)
  const [menuStatus, set_menuStatus] = useState(true)
  const [textValue, setTextValue] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(0);
  const msgBoxRef = useRef(null)
  const arr = [{
    type: "user",
    text: "Once upon a time, a farmer had a goose that laid a golden egg every day. The farmer used to sell that egg and earn enough money to meet their family's day-to-day needs. One day, the farmer thought that if he could get more such golden eggs and make a lot of money and become a wealthy person. The farmer decided to cut the goose and remove all the golden eggs from its stomach. As soon as they killed the bird and opened the goose’s stomach, they found no eggs. The foolish farmer realized they had destroyed their last resource out of greed."

  }, 
  {
    type: "bot",
    text: "Once upon a time, a farmer had a goose that laid a golden egg every day. The farmer used to sell that egg and earn enough money to meet their family's day-to-day needs. One day, the farmer thought that if he could get more such golden eggs and make a lot of money and become a wealthy person. The farmer decided to cut the goose and remove all the golden eggs from its stomach. As soon as they killed the bird and opened the goose’s stomach, they found no eggs. The foolish farmer realized they had destroyed their last resource out of greed."

  },
  {
    type: "user",
    text: "Once upon a time, a farmer had a goose that laid a golden egg every day. The farmer used to sell that egg and earn enough money to meet their family's day-to-day needs. One day, the farmer thought that if he could get more such golden eggs and make a lot of money and become a wealthy person. The farmer decided to cut the goose and remove all the golden eggs from its stomach. As soon as they killed the bird and opened the goose’s stomach, they found no eggs. The foolish farmer realized they had destroyed their last resource out of greed."

  },
  {
    type: "bot",
    text: "Once upon a time, a farmer had a goose that laid a golden egg every day. The farmer used to sell that egg and earn enough money to meet their family's day-to-day needs. One day, the farmer thought that if he could get more such golden eggs and make a lot of money and become a wealthy person. The farmer decided to cut the goose and remove all the golden eggs from its stomach. As soon as they killed the bird and opened the goose’s stomach, they found no eggs. The foolish farmer realized they had destroyed their last resource out of greed."

  },
  {
    type: "user",
    text: "Once upon a time, a farmer had a goose that laid a golden egg every day. The farmer used to sell that egg and earn enough money to meet their family's day-to-day needs. One day, the farmer thought that if he could get more such golden eggs and make a lot of money and become a wealthy person. The farmer decided to cut the goose and remove all the golden eggs from its stomach. As soon as they killed the bird and opened the goose’s stomach, they found no eggs. The foolish farmer realized they had destroyed their last resource out of greed."

  }, 
  {
    type: "bot",
    text: "Once upon a time, a farmer had a goose that laid a golden egg every day. The farmer used to sell that egg and earn enough money to meet their family's day-to-day needs. One day, the farmer thought that if he could get more such golden eggs and make a lot of money and become a wealthy person. The farmer decided to cut the goose and remove all the golden eggs from its stomach. As soon as they killed the bird and opened the goose’s stomach, they found no eggs. The foolish farmer realized they had destroyed their last resource out of greed."

  }]
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

  const [prevTranscript, set_PrevTranscript] = useState("")
  useEffect(() => {

    if (transcript) set_msgValue(msgValue + " " + transcript.slice(prevTranscript.length, transcript.length).trim())
    set_PrevTranscript(transcript)
  }, [transcript])



  const handle_msgChange = (e) => {
    set_msgValue(e.target.value)
  }

  const handle_sendMsg = (e) => {
    speak()
    set_sendStatus(!sendStatus)
  }

  const handle_menu = (e) => {
    set_menuStatus(!menuStatus)
  }
  // const handle_pause = (e) => {
  //   synth.pause()
  // }

  // const aa = ()=> SpeechRecognition.startListening({ continuous: true })
  const handle_micClick = () => {

    if (micstatus) {
      SpeechRecognition.startListening({ continuous: true })
    } else {
      SpeechRecognition.stopListening()
    }
    set_micstatus(!micstatus)
  }

  const speak = (e) => {
    // e.preventDefault();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(msgValue);
    utterance.voice = synth.getVoices()[selectedVoice];
    synth.cancel();
    synth.speak(utterance);
  };
  

  return (
    <div className='voice-chat'>
      <div className='vc-chat-wp'>
        {/* {
          arr?.map((item, i) => (
            <ChatBox key={i} type={item.type} text={item.text} />
          ))
        } */}
        {/* <textarea rows={1} onChange={handle_msgChange} value={transcript} ref={msgBoxRef} placeholder='Type your message...' className='msg-box'>

        </textarea> */}
      </div>
      <div className='vc-controller-wp'>
      <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice} />
        <div className='vc-msg-box-wp'>
          {browserSupportsSpeechRecognition ?
            <textarea rows={1} onChange={handle_msgChange} value={msgValue} ref={msgBoxRef} placeholder='Type your message...' className='vc-msg-box'></textarea>
            : <p>Your browser does not Supports SpeechRecognition</p>}
        </div>

        {/* <div onClick={handle_micClick} className='vc-send-wp'>
          {micstatus ? <Send /> : <Loader1 />}
        </div> */}
        {menuStatus ? 
        <div onClick={handle_menu} className='vc-send-wp'>
          <span class="material-symbols-outlined">
            more_vert
          </span> 
        </div>:
        <div className='menu-list-wp'>

          <div onClick={handle_menu} className='vc-menu-wp-onOpen'>
            <span class="material-symbols-outlined">
              more_vert
            </span>
          </div>
          
          <div onClick={handle_micClick} className='vc-mic-wp'>
            {micstatus ? <Mic /> : <Pause />}
          </div>

          <div onClick={handle_sendMsg} className='vc-send-wp'>
            {!sendStatus ? <Loader1 /> : <Send />}
          </div>

          <div onClick={()=>synth.pause()} className='vc-send-wp'>
            P
          </div>

          <div onClick={()=>synth.resume()} className='vc-send-wp'>
            R
          </div>
          
        
        </div>}
        

        {/* <div onClick={handle_micClick} className='vc-mic-wp'>
          {micstatus ? <Mic /> : <Pause />}
        </div> */}
      </div>
    </div>
  )
}

export default VoiceChat