import React, { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin, ScrollTrigger } from 'gsap/all';
import planeImage from '../assets/img/ship.png'


gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

const AnimatedBox = () => {
    useEffect(() => {

      const remPath = [
        `M0,${remToPx(3)}`,  // 3rem converted to pixels for Y value
        `Q${remToPx(6)},${remToPx(3)} ${remToPx(12)},${remToPx(6)}`,  
        `T${remToPx(36)},${remToPx(6)}`,
        `T${remToPx(60)},${remToPx(6)}`,
        `T${remToPx(96)},${remToPx(6)}`  
      ].join(' '); 

      const box = document.querySelector('.box') 

      gsap.to(".box", {
        duration: 5,
        motionPath: {
          path: remPath, //taking from rem to px for responive
          // path: "M0,50 Q100,50 200,100 T600,100 T1000,100 T1600,100", // standard way
          align: ".box",
          autoRotate: true
        },
        // repeat: -1,
        // yoyo: true,
        scrollTrigger: {
          trigger: ".box", 
          start: "top center", 
          end: "200% top", 
          scrub: 1,
          smoothScrub: 0.1,
          pin: true,
          markers: true,
          onLeave: () => {
            box.style.display = 'none';
          },
          onEnter: () => {
              box.style.display = '';
          },
        }
      });
    }, []);
  
    return (
        <div className="box" style={{ width: '10rem', height: '10rem', position: 'absolute' }}>
          <img src={planeImage} alt="" />
        </div>
    );
  };
  
  export default AnimatedBox;
    
