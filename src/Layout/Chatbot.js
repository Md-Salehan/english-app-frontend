import React, { useRef, useState } from 'react'
import { SendHorizontal } from 'lucide-react';
import {OpenAI} from "openai";
import { useEffect } from 'react';

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true});

function Chatbot({width, handle_toggle_rightBody, toggleBtn_isActive}) {
  const scrollRef = useRef()
  const inputRef = useRef(null);
  const [prompt_height, set_prompt_height] = useState(1)
  const [prompt, set_prompt] = useState("")
  const [loading, set_loading] = useState(false)
  const [msgArr, set_msgArr] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.",
    }
  ])
  console.log(msgArr);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
    if(toggleBtn_isActive)inputRef.current.focus();
  }, [msgArr])

  
  
  const handle_promptDiv_size = (e)=>{
    const {key} = e;
    // if(key === "Enter"){
    //   if(prompt_height <= 4)set_prompt_height(prompt_height+1)
    // };
    // if(key === "Backspace"){
    //   if(prompt.length > 0 && prompt[prompt.length-1] === "\n" && prompt_height>=1 ){
    //     set_prompt_height(prompt_height-1)
    //   }
    // };
    // console.log("keyDown",prompt_height);
    
  }
  const handle_prompt_change = (e)=>{
    const {value} = e.target;
    let count=1;
    for(let i=0; i<value.length; i++){
      if(value[i] === "\n") count++;
    }
    if(count > 5) set_prompt_height(5)
    else set_prompt_height(count)
    set_prompt(value)
  }

  const call_assistant = async (e)=>{
    let conversation = [
      ...msgArr,
      { 
        role: "user",
        content: prompt
      }
    ]

    set_prompt("")
    set_msgArr(conversation)

    set_loading(true)
    try {
      const completion = await openai.chat.completions.create({
        messages: conversation,
        model: "gpt-3.5-turbo-1106",
      });
      if(completion.choices[0].finish_reason === "stop"){
        conversation = [
          ...conversation,
          { 
            role: completion.choices[0].message.role,
            content: completion.choices[0].message.content
          }
        ]
      }
    } catch (error) {
      console.log(error);
      conversation = [
        ...conversation,
        { 
          role: "assitant",
          content: "Error !! Please try sometime later"
        }
      ]
    } 

    set_loading(false)
    set_msgArr(conversation)
  }

  return (
    <div className='chat-bot'>
              <div className='chat-header'>
                  {width <= 850 && <button onClick={handle_toggle_rightBody}  type='button' className='toggle-btn'>{`${toggleBtn_isActive ? "<" : ">"}`}</button>}
                <p className='bot-tagline'>{
                  loading? "Ally is typing ...":"I'm Ally: Unlocking English Potential, Question by Question."}</p>
              </div>
              <div className='chat-body'>
                {msgArr.length <= 1 && <p className='help-line'>How I can help you today?</p>}
                {
                  msgArr.map((item,index)=>{
                    return index>0? 
                    <div ref={scrollRef} key={index} className={`msg-box ${item.role === "user"? "user-msg":"bot-msg"}`}><p>{item.content}</p></div> : 
                    <div key={index}></div>
                  })
                }
              </div>
              <div className='chat-footer'>
                  <div className='prompt-input-div'>
                    <textarea ref={inputRef} value={prompt} onChange={handle_prompt_change} rows={prompt_height} className='prompt-input' />
                    <div onClick={call_assistant} className='send-icon-container'>
                      <SendHorizontal color="#3e9392" strokeWidth={1} size={28} />
                    </div>
                  </div>
              </div>
              </div>
  )
}

export default Chatbot