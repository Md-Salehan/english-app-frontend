import React from 'react'
import './tools.css';
import TextChecker from '../../Component/textChecker/TextChecker';
function Tools() {
  return (
    <div className='tools-body'>
      <div className='tool-bar'>
        
      </div>
      <TextChecker />

      {/* <div className='text-wp'>
        <div style={{marginTop: "100vh"}} className='block-wp'>
          <div style={{
            //backgroundColor: "blue",
            width: "300px",
            height: "100px", 
            margin:"15px"}} className='block'></div>
            <div style={{
            //backgroundColor: "blue",
            width: "200px",
            height: "300px", 
            margin:"15px"}} className='block'></div>
          <div style={{
            //backgroundColor: "blue",
            width: "500px",
            height: "300px", 
            margin:"15px"}} className='block'></div>
            <div style={{
            //backgroundColor: "blue",
            width: "100px",
            height: "200px", 
            margin:"15px"}} className='block'></div>
            <div style={{
            //backgroundColor: "blue",
            width: "760px",
            height: "400px", 
            margin:"15px"}} className='block'></div>
        </div>
      </div> */}
    </div>
  )
}

export default Tools