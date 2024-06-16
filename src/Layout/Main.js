import React, { useEffect, useState } from 'react'
import './layoutStyle.css'
import NavBar from './NavBar'
import Chatbot from './Chatbot'
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { Outlet, useLocation, useParams } from 'react-router-dom'
import useWindowDimensions from '../customHooks/useWindowDimensions';

function Main() {
  const { height, width } = useWindowDimensions();
  const location = useLocation()
  // console.log(location);
  // let pageTitle = location.pathname.split('/')[2].replace("%20", " ");
  // console.log(window.location);
  const [toggleBtn_isActive, setIsActive] = useState(false);
  const [navtoggleBtn, set_navToggleBtn] = useState(false);
  const handle_toggle_rightBody = (e) => {
    setIsActive(!toggleBtn_isActive)
  }
  const handle_navToggle = (e) => {
    set_navToggleBtn(!navtoggleBtn)
  }
  // const get_pageTitle = () => {
  //   let pathname = window?.location?.pathname
  //   if("/page/dailyvocab") pageTitle = "Daily Vocab"
  //   else if("/page/grammarhub") pageTitle = "Grammar Hub"
  //   else if("/page/myaccount") pageTitle = "My Account"
  //   else if("/page/tools") pageTitle = "Tools"
  //   else if("/page/voicechat") pageTitle = "Voice Chat"
  // }
  // let pageTitle;
  //let pathname = location.pathname
  const [pageTitle, set_pageTitle] = useState("")
  useEffect(() => {
    // let pathname = window?.location?.pathname
    let pathname = location.pathname

    if( pathname === "/page/dailyvocab" ) set_pageTitle("Daily Vocab")
    else if( pathname === "/page/grammarhub" ) set_pageTitle("Grammar Hub")
    else if( pathname === "/page/myaccount") set_pageTitle("My Account")
    else if( pathname === "/page/tools") set_pageTitle("Tools")
    else if( pathname === "/page/voicechat") set_pageTitle("Voice Chat")
  }, [location.pathname])
  
  return (
    <div className='main'>
      <NavBar navtoggleBtn={navtoggleBtn} width={width} />
      <div className={`inner-main-wrapper ${navtoggleBtn && "show-navbar-c2"}`} >
        <div className='inner-main'>
          <div className={`left-body ${toggleBtn_isActive ? "expand" : ""}`}>
            <div className='page home'>
              <div className='header'>
              
              <div>
              {width <= 850 && (navtoggleBtn ? 
              <X onClick={handle_navToggle} className='icon' /> : 
              <Menu onClick={handle_navToggle} className='icon' />)}
              <h1 className='header-title'>{pageTitle}</h1>
              </div>
                
                <div className='toggle-btn-container'>
                  <button onClick={handle_toggle_rightBody} type='button' className='toggle-btn'>{`${toggleBtn_isActive ? "<" : ">"}`}</button>
                </div>
              </div>
              <div className='page-body'>
                <Outlet />
              </div>
            </div>
          </div>
          <div className={`right-body ${toggleBtn_isActive ? "collaps" : ""}`}>
            <Chatbot
            width={width} 
            handle_toggle_rightBody={handle_toggle_rightBody}
            toggleBtn_isActive={toggleBtn_isActive} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main