import React from 'react'
import './layoutStyle.css'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Home, BookA, Wand2, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function NavBar({width, navtoggleBtn}) {
  const navigate = useNavigate()
  console.log("Navbar");
  return (
    <div className={`navbar ${navtoggleBtn && "show-navbar-c1"}`}>
      <div className='logo-container nav-item'>
        <img className='logo' src='../../image/open-ai-loho.png' alt='logo' />

      </div>
      {/* <div onClick={() => navigate("/page/myaccount")} className='content-nav nav-item'>
        <UserCircle2 strokeWidth={1} size={35} />
      </div> */}

      <div className='content-nav-container'>

        <div onClick={() => navigate("/page/dailyvocab")} className='content-nav mg-b-20'>
          <Home strokeWidth={1} size={28} />
        </div>

        <div onClick={() => navigate("/page/grammarhub")} className='content-nav mg-b-20'>
          <BookA strokeWidth={1} size={28} />
        </div>

        <div onClick={() => navigate("/page/tools")} className='content-nav mg-b-20'>
          <Wand2 strokeWidth={1} size={28} />
        </div>

        <div onClick={() => navigate("/page/voicechat")} className='content-nav mg-b-20'>
          <Wand2 strokeWidth={1} size={28} />
        </div>

      </div>

    </div>
  )
}

export default NavBar