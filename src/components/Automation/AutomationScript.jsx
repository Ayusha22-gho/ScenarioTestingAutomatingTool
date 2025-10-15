import React from 'react'
import { useState, useContext, useEffect } from "react";


//state in React
 function AutomationScript({message}) {

  const [count, setCount] = useState(0)

  const handclick = () =>{
      setCount(count +1)
  }

 
  return (
    <div >
    <div>AutomationScript</div>
    <button> Login </button>
    <button onClick = {handclick}>Click</button>
    <p> {count}</p>
    <p> {message}</p>
    </div>
  )
}

export default function ParnetComponent(){
  const message = "this is parent"
  return(
    <AutomationScript message = {message}/>
    
  )
}
 