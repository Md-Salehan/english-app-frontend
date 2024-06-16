import React, { useEffect } from 'react'
import "./chatBox.css"
import { Play } from 'lucide-react';
import { Pause } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';

const synth = window.speechSynthesis;

function ChatBox({type, text, play1, play2, set_play1, set_play2, index, chatLength , autoPlay, set_autoPlay}) {
    const [correctText, set_correctText] = useState("No one believes a liar even if they speak the truth once.")
    const [showCorrection, set_showCorrection] = useState(false)

    // const synth = window.speechSynthesis;
    useEffect(() => {
        return () => {
            synth.cancel();
            set_autoPlay({
                status: false,
                index: -1
              })
        };
      }, []);

     

    // const onMsgPlay = (e, index)=>{
    //     const utterance = new SpeechSynthesisUtterance(text);
    //     utterance.voice = synth.getVoices()[158];
    //     set_play1(index)
    //     set_play2(-1)
    //     synth.cancel();
    //     synth.speak(utterance);
    // }
    const onMsgPlay = (e, index)=>{
        
        set_play1(index)
        set_play2(-1)
        synth.cancel();
        const textArr = text.split(".")
        
        textArr.forEach((item, index)=> {
            const utterance = new SpeechSynthesisUtterance(item);
            utterance.rate = 1
            utterance.onend=()=>{
                if(index === textArr.length-1)
                set_play1(-1)
            }
            utterance.voice = synth.getVoices()[159];
            // console.log(synth.getVoices());
            synth.speak(utterance);
        });
    }

    const onMsgPause = (e, index)=>{
        set_play1(-1)

        synth.pause()
        
    }
    useEffect(() => {
        if(text && type !== "user" && index === chatLength-1){
            console.log("useeffect2");
            onMsgPlay(null, index)
        }
        
      }, [text]);


    const onGrammarPlay = (e, index)=>{
        const utterance = new SpeechSynthesisUtterance(
            correctText? correctText :
            "There is an error! Nothing to play"
        );
        utterance.voice = synth.getVoices()[158];
        set_play2(index)
        set_play1(-1)
        synth.cancel();
        synth.speak(utterance);
    }

    const onGrammarPause = (e, index)=>{
        set_play2(-1)

        synth.pause()
    }

    // useEffect(() => {
    //     if(autoPlay.status){
    //         console.log("xxxccc");
    //         onMsgPlay(null, autoPlay.index)
    //     }
    //   }, [autoPlay]);


    const handle_checkGrammer = (e)=>{
        set_showCorrection(!showCorrection)
    }

    return (
        <div className={'chatBox'} style={{marginLeft: type==="user"?"auto":"0"}}>
            <div className='chatBox-header' 
            style={{flexDirection: type==="user"?"row":"row-reverse"}} >
                <div className='tool-wp'>
                {play1 === index? 
                            <Pause className='icon' 
                            size={18} 
                            color={"#9e9e9e"}
                            onClick={(e)=>onMsgPause(e, index)} />:
                            <Play className='icon' 
                            size={18} 
                            color={"#9e9e9e"}
                            onClick={(e)=>onMsgPlay(e, index)}
                             />
                }
                </div>
                <div className='profile-wp'
                style={{flexDirection: type==="user"?"row":"row-reverse"}}>
                    <span className='vc-username'>
                        {
                            type==="user"?"userName":"Ally"
                        }
                    </span>
                    <img 
                    style={{
                        marginLeft: type==="user"?"5px":"0",
                        marginRight: type==="user"?"0":"5px"
                    }}
                    className='vc-person-avatar' 
                    src={'../../../image/'+(type==="user"?"person_avatar.png": "ai_avatar2.jpeg")}
                    alt='dp.png' />
                </div>
            </div>
            <div className={'chatBox-body'+(type==="user"? "":" bot-cb-body")}>
                <p>{text}</p>

                {type === "user" && 
                <div className='cb-grammar-wp'>
                    <div className='cb-grammar-header'>
                        <div onClick={handle_checkGrammer} className='cb-check-grammer-btn'>
                            <span>Check Grammar Feedback </span>
                            <ArrowDown color='#e05c65' />
                        </div>
                        {showCorrection &&
                            (play2 === index? 
                            <Pause className='icon' 
                            size={18} 
                            color={"#9e9e9e"}
                            onClick={(e)=>onGrammarPause(e, index)} />:
                            <Play className='icon' 
                            size={18} 
                            color={"#9e9e9e"}
                            onClick={(e)=>onGrammarPlay(e, index)} />
                            )
                        }
                    </div>
                    {showCorrection && 
                        <div className='cb-grammar-body'>
                            <p>{correctText}</p>
                        </div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default ChatBox