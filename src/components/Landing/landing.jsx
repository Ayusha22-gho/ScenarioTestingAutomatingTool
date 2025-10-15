import React, { useState } from "react";
import './landing.css'
import Modal from "../Modal/modal"
export default function Landing() {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
     <div className="landing-page">
     <div className="hero">
       <h1 className="landing-heading">PRITA</h1>
       <p className="subheading">Get ready to experience the future of [insert industry/field here]</p>
       <button className="launch-button" onClick={() => setIsOpen(true)} >Launch</button>
      {isOpen && <Modal setIsOpen={setIsOpen} configureFlag = {false}/>}
     </div>
   </div>
  )
}
