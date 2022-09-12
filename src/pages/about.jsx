import { useState, useEffect } from "react";
import "./about.css";
import dataSlider from './data'

function About() {
    const [currentIndex,setCurrentIndex] = useState(0);
    

   useEffect(
        () => {
        const id =   setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % dataSlider.length)
           },5000);
        return () => {
            clearInterval(id)
        };
        },[currentIndex]
   )

    return <>
        <div className="about">
            <WriteUp heading={dataSlider[currentIndex].heading} text = {dataSlider[currentIndex].text} />
        </div>
    </>
}

function WriteUp(props) {
    return <>
        <div className="writeUp">
            <h3>{props.heading}</h3>
            <hr />
            <p>{props.text}</p>
              
        </div>
    </>
}

export default About;