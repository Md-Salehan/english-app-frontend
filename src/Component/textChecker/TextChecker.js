import React, { useEffect, useRef, useState } from 'react'
import './textChecker.css'
import axios from 'axios';


// function TextChecker() {
//   const textAreaRef = useRef()
//   let x = [{
//     offset: 0,
//     length: 5
//   },
//   {
//     offset: 6,
//     length: 5
//   },
//   {
//     offset: 13,
//     length: 5
//   },
// ]
//   const highLightText = (e,data=x)=>{
//     const input = document.querySelector(".input-para pre")
//     const inputArr = document.querySelectorAll(".input-para pre div")
//     let strArr =[]
//     let str = input.textContent
//     let str_len = 0
//     inputArr.forEach(ele=>{
//       strArr =[...strArr, ele.textContent]
//       str_len += ele.textContent.length
//     })
//     str = str.slice(0,str.length-str_len)
//     // strArr = [str, ...strArr]

//     strArr.forEach(item=>{
//       str += `<div>${item}</div>`
//     })
    
//     // let str = text
//     // str = str.replace(new RegExp("0","gi"), "            ")
//     console.log(strArr);
//     // let len = `<span class='high-light'></span>`.length 
//     // let l =0

//     // data.forEach(errItem => {
//     //   str = str.slice(0,errItem.offset+l)+`<span class='high-light'>`
//     //   +str.slice(errItem.offset+l,errItem.offset+errItem.length+l)+
//     //   `</span>`
//     //   +str.slice(errItem.offset+errItem.length+l, str.length+l)
//     //   l+=len
//     // });
    
//     input.innerHTML = str
    
//   }
//   useEffect(() => {
//     const fetchData = async () => {
//       const body = {
//         text: 'My mother are a doctor, but my father is a angeneer. I has a gun.'
//       }
//       try {
//         const response = await axios.post(
//           'https://textgears-textgears-v1.p.rapidapi.com/grammar',
//           body,
//           {
//             headers: {
//               'content-type': 'application/x-www-form-urlencoded',
//               'X-RapidAPI-Key': 'f708101664mshd3a95cd51f32ed3p10e5dbjsn2f5ec5e4758d',
//               'X-RapidAPI-Host': 'textgears-textgears-v1.p.rapidapi.com',
//             },
//           }
//         );
//         console.log(response.data);

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     // fetchData();
//   }, []);
//   const [text, set_text] = useState("")
//   const [resultflg, set_resultflg] = useState(1)
  
//   return (
//     <div className='text-checker-container'>
//         <div className='textArea-container'>
//           {resultflg ?
//             <div  className='input-para'
//             // dangerouslySetInnerHTML={{ __html: ""}}
//             >
//             <p className='text-editor1'>
//             {text}
//             </p>
//             <textarea resize={"none"} value={text} onChange={(e)=> set_text(e.target.value)}  className='text-editor2'
//             >
//           </textarea>
//           </div>
//           :

//             <textarea resize={"none"} value={"gggg"} onChange={(e)=> set_text(e.target.value)}  className='input-para'
//             >
//           </textarea>}
//         </div>
//         <button type='button' onClick={(e)=>{set_resultflg(1);highLightText(e)}}>click</button>
//     </div>
//   )
// }

// function TextChecker() {
//   const [text, setText] = useState('');
//   const [highlightedText, setHighlightedText] = useState('doctor');
//   const editableDivRef = useRef(null);

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   };

//   const highlightWords = (text, highlightedText) => {
//     const words = text.split(/(\s+)/);
//     // const regex = new RegExp(`\\b(${highlightedText})\\b`, 'gi');
  
//     // const highlightedWords = words.map((word) => {
//     //   if (regex.test(word)) {
//     //     return `<mark>${word}</mark>`;
//     //   }
//     //   return word;
//     // });
  
//     // return highlightedWords.join('');
//     console.log(words);
//   };
//   useEffect(() => {
//     if (editableDivRef.current) {
//       const selection = window.getSelection();
//       const range = document.createRange();
//       range.selectNodeContents(editableDivRef.current);
//       range.collapse(false);
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   }, [text]);

//   const handleContentChange = (e) => {
//     setText(e.currentTarget.textContent);
//   };

//   const highlightedContent = highlightWords(text, highlightedText);
  
//   return (
//     <div className='text-checker-container'>
//         <div>
//       <div
//         ref={editableDivRef}
//         contentEditable="true"
//         style={{
//           border: '1px solid #ccc',
//           minHeight: '100px',
//           padding: '5px',
//         }}
//         onInput={handleContentChange}
//         dangerouslySetInnerHTML={{ __html: highlightedContent }}
//       />
//       <textarea
//         value={text}
//         onChange={handleTextChange}
//         placeholder="This is a hidden textarea for submission"
//         style={{ display: 'none' }}
//       />
//     </div>
//         {/* <button type='button' onClick={(e)=>{set_resultflg(1);highLightText(e)}}>click</button> */}
//     </div>
//   )
// }

function TextChecker() {
  const [text, setText] = useState('');
  const textBox = useRef(null)
  

  const handle_submit = (e)=>{
    e.preventDefault()
    console.log("ok");
    if(textBox?.current){
      console.log(textBox?.current.innerText);
    }
  }

  
  return (
    <div className='text-checker-container'>
        <span ref={textBox} className='text-box' role="textbox" contenteditable="true" >
    hhhh
        </span>
        <button onClick={handle_submit}>
          CLICK
        </button>
    </div>
  )
}

export default TextChecker