import React, { useEffect, useRef, useState } from 'react'
import "./voiceChat.css"
import { Mic } from 'lucide-react';
import { Pause } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function VoiceChat() {
  const [msgValue, set_msgValue] = useState("")
  const [msgValue2, set_msgValue2] = useState("")
  const [msgValue3, set_msgValue3] = useState("")
  const [micstatus, set_micstatus] = useState(true)
  const msgBoxRef = useRef(null)
  const arr = ["", "", "", "",""]
  let {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (msgBoxRef) {
      msgBoxRef.current.style.height = "100%";
      const scrollHeight = msgBoxRef?.current?.scrollHeight;
      msgBoxRef.current.style.height = scrollHeight + "px";
    }
  }, [msgBoxRef, msgValue])


  useEffect(() => {
    if (interimTranscript) set_msgValue(msgValue + " " + interimTranscript)
  }, [interimTranscript])

  const [pr, setpr] = useState("")
  useEffect(() => {
    if (finalTranscript){
      console.log(finalTranscript, interimTranscript, transcript);
    }
    if (transcript) set_msgValue2(msgValue2 + " " + transcript.slice(pr.length, transcript.length).trim())
    setpr(transcript)
  }, [transcript])

  useEffect(() => {
    if (transcript) set_msgValue3(msgValue3 + " " + transcript)
  }, [transcript])



  const handle_msgChange = (e) => {
    console.log(e.target.value);
    transcript = e.target.value
    set_msgValue2(e.target.value)
  }

  // const aa = ()=> SpeechRecognition.startListening({ continuous: true })
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
          arr?.map((e, i) => (
            <p key={i}>hahabbahahah</p>
          ))
        }
        <textarea rows={1} onChange={handle_msgChange} value={msgValue} ref={msgBoxRef} placeholder='Type your message...' className='msg-box'>

        </textarea>
        <textarea rows={1} onChange={handle_msgChange} value={msgValue2} ref={msgBoxRef} placeholder='Type your message...' className='msg-box'>

        </textarea>
        <textarea rows={1} onChange={handle_msgChange} value={msgValue3} ref={msgBoxRef} placeholder='Type your message...' className='msg-box'>

        </textarea>
      </div>
      <div className='vc-controller-wp'>
        <div className='vc-msg-box-wp'>
          {browserSupportsSpeechRecognition ?
            <textarea rows={1} onChange={handle_msgChange} value={msgValue2} ref={msgBoxRef} placeholder='Type your message...' className='vc-msg-box'></textarea>
            : <p>"hhh"</p>}
        </div>

        <div onClick={handle_micClick} className='vc-mic-wp'>
          {micstatus ? <Mic /> : <Pause />}
        </div>
      </div>
    </div>
  )
}

export default VoiceChat