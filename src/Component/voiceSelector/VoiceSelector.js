import React, { useCallback, useEffect, useState } from 'react'
import "./voiceSelector.css";
const synth = window.speechSynthesis;

function VoiceSelector({selected = 0, setSelected}) {
    const [voices, setVoices] = useState([]);

    const populateVoiceList = useCallback(() => {
      const newVoices = synth.getVoices();
      const list = newVoices.filter((voice, i) => {
        console.log(voice.name+" "+voice.lang+" "+i)
        return voice.lang === "en-US"})
      setVoices(newVoices);
    }, []);
  
    useEffect(() => {
      populateVoiceList();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
      }
    }, [populateVoiceList]);
  
    return (
      <select
        value={selected}
        onChange={(e) => setSelected(parseInt(e.target.value))}
      >
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
          </option>
        ))}
      </select>
    );
}

export default VoiceSelector