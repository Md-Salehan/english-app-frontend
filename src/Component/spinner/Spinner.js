import React from 'react'
import "./spinner.css"
function Spinner({size, color}) {
    return (
        <div style={size? {width: size, height: size}: {}} class="spinner">
            <div style={color? {background: color}: {}} ></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
            <div style={color? {background: color}: {}}></div>
        </div>
    )
}

export default Spinner