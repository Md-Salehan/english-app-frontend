import React, { forwardRef, useEffect } from 'react'
import "./chatBox.css"
import "./chatBoxLoader.css"
import { Play } from 'lucide-react';
import { Pause } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import Spinner from '../../Component/spinner/Spinner';


const ChatBoxLoader = forwardRef(({}, ref)=>{
    const [showFllag, set_showFllag] = useState(false)
    useEffect(() => {
      setTimeout(()=>set_showFllag(true), 200)
    }, [])
    

    return (
        <div style={{height: "220px"}} ref={ref}>
            {
                showFllag?
                <div className={'chatBox'} style={{marginLeft: "0"}}>
            <div className='chatBox-header' 
            style={{flexDirection: "row-reverse"}} >
                <div style={{marginRight: "10px"}} className='tool-wp'>
                
                            <Spinner className='icon' 
                            size={3} 
                            color={"#9e9e9e"}
                            />
                
                </div>
                <div className='profile-wp'
                style={{flexDirection: "row-reverse"}}>
                    <span className='vc-username'>
                        {
                            "Ally"
                        }
                    </span>
                    <img 
                    style={{
                        marginLeft: "0",
                        marginRight: "5px"
                    }}
                    className='vc-person-avatar' 
                    src={'../../../image/ai_avatar2.jpeg'}
                    alt='dp.png' />
                </div>
            </div>
            <div className={'chatBox-body bot-cb-body'}>
            <div class="cb-loader">
  <div class="wrapper">
    
    <div class="line-1"></div>
    <div class="line-2"></div>
    <div class="line-3"></div>
    <div class="line-4"></div>
  </div>
</div>

            
            </div>
        </div>:
        ""
            }
        </div>
    )
})

export default ChatBoxLoader


// ChatBoxLoader