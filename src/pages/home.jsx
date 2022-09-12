import "./home.css";
import htmlLogo from "./images/html.png"
import react from "./images/react.png"
import github from "./images/github.png"
import tailwind from "./images/tailwind.png"
import css from "./images/css.png"
import bootstrap from "./images/bootstrap.png"
import { useState } from "react";
import { useEffect } from "react";


export default function Home() {
    const [position,setPosition] = useState(false);
    useEffect(() => {
        setTimeout(() => {
          setPosition(!position);
        }, 500);
        
      },[]);
    
    return <div className="main">
        <h1>
            <span className="p1">Frontend</span> <span className="p2">Web Developer</span> <span className="p3">and Tutor</span> 
        </h1>

        <h4> <span>I build user interfaces</span>   <span>and also Tutor on</span>
         <span>web development.</span>
        </h4>

        <div className={position?"logos" : "activate" }>
            <img src={htmlLogo} alt="" className="imgs"/>
            <img src={css} alt="" className="imgs"/>
            <img src={react} alt="" className="imgs"/> 
            <img src={bootstrap} alt="" className="imgs"/>
            <img src={tailwind} alt="" className="imgs"/>
            <img src={github} alt="" className="imgs"/>
        </div>    
    </div>
}