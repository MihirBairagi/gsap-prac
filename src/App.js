import React, { useEffect, useRef } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger, Draggable  } from "gsap/all";
import Lenis from '@studio-freight/lenis';
import imageOne from './assets/img/image-1.png'
import imageTwo from './assets/img/image-2.png'
import team1 from './assets/img/tean-1.png'
import team2 from './assets/img/tean-2.png'
import team3 from './assets/img/tean-3.png'
import team4 from './assets/img/tean-4.png'
import team5 from './assets/img/tean-5.png'
import LottieScroll from "./components/LottieScroll";
import animationData from "./assets/Growth Animation.json";
import AnimatedBox from './components/AnimatedBox';




function App() {

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(Draggable, ScrollTrigger);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      // easing: (t) => Math.min(1, 1.5 * t), // Adjust easing for responsiveness
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update(); // Update GSAP ScrollTrigger
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP animations

    const numberOfItems = sectionRef.current.querySelectorAll('li').length;
    const remValue = (numberOfItems * 19) + 15;
    const vwValue = window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize); 
    const result = remValue - vwValue;
    

    const pin = gsap.fromTo(sectionRef.current,{
      translateX: 0
    },{
      translateX: `${-result}rem`,
      ease: 'none',
      duration: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "300% 10%",
        pin: true,
        scrub: 1,
        smoothScrub: 0.1,
        // markers: true,
      },
    });

    document.querySelectorAll('.section').forEach(section => {
      gsap.fromTo(section, {
        y: '10rem',
        opacity: 0,
      },{
        y: '0rem',
        ease: "power2.inOut",
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 10%",
          scrub: 1,
          smoothScrub: 0.1,
          // markers: true,
        },
      });
    });


    const tl = gsap.timeline();   
    tl.fromTo('.up', {
      y: '10rem',
      opacity: 0,
    },{
          y: '0rem',
          ease: "power2.inOut",
          duration: 1, 
          opacity: 1,
          stagger: 0.3,
          scrub: 1,
        });


    const tl2 = gsap.timeline();

    tl2.fromTo('.up2', {
      y: '10rem',
      opacity: 0,
    },{
          y: '0rem',
          ease: "power2.inOut",
          duration: 1, 
          opacity: 1,
          stagger: 0.3,
          delay: 1,
          scrub: 1,
          scrollTrigger: {
            trigger: '.section-4',
            start: "top 60%",
            end: "top -10%",
            scrub: 1,
            smoothScrub: 0.1,
            // markers: true,
          },
        });

    return () => {
      pin.kill()
    }

  }, []);


  return (
   <>
   <section className='section-1' >
      <div className="container">
        <div className="section-box-1 flex justify-between py-[8rem]">
          <div className="text-box w-[45%]">
              <h1 className='text-[5rem] leading-[1.1] mb-[2rem] up' >This is a Section with Images</h1>
              <p className='up' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quo possimus natus ipsum impedit sapiente aspernatur quos perspiciatis ipsa ab repellendus quidem magnam, enim in.</p>
          </div>
          <div className="img-box flex justify-between w-[50%]">
            <div className="img-box w-[48%] up">
              <img className='object-cover h-[100%]' src={imageOne} alt="" />
            </div>
            <div className="img-box w-[48%] up">
              <img className='object-cover h-[100%]' src={imageTwo} alt="" />
            </div>
          </div>
        </div>
      </div>
   </section>
   <section className='section-2 section' ref={triggerRef}>
        <div className="section-box-2 py-[8rem]">
          <h2 className='ml-[8rem]' >Our Services</h2>
          <ul className='team-listing flex' ref={sectionRef} >
            <li>
              <img src={team1} alt="" />
            </li>
            <li>
              <img src={team2} alt="" />
            </li>
            <li>
              <img src={team3} alt="" />
            </li>
            <li>
              <img src={team4} alt="" />
            </li>
            <li>
              <img src={team5} alt="" />
            </li>
            <li>
              <img src={team1} alt="" />
            </li>
            <li>
              <img src={team2} alt="" />
            </li>
            <li>
              <img src={team3} alt="" />
            </li>
          </ul>
        </div>
   </section>
   <section className='section-4' >
      <div className="container">
        <div className="section-box-1 flex justify-between py-[8rem]">
          <div className="img-box flex justify-between w-[50%]">
            <div className="img-box w-[48%] up2">
              <img className='object-cover h-[100%]' src={imageOne} alt="" />
            </div>
            <div className="img-box w-[48%] up2">
              <img className='object-cover h-[100%]' src={imageTwo} alt="" />
            </div>
          </div>
          <div className="text-box w-[45%]">
              <h1 className='text-[5rem] leading-[1.1] mb-[2rem] up2' >This is a Section with Images</h1>
              <p className='up2' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quo possimus natus ipsum impedit sapiente aspernatur quos perspiciatis ipsa ab repellendus quidem magnam, enim in.</p>
          </div>
        </div>
      </div>
   </section>
   {/* <AnimatedBox/> */}
    <section className='section-7 section' >
      <div className="container">
        <div className="section-box-7">
          <h2 className='text-center' >Motion Path Animation</h2>
        </div>
      </div>
    </section>
   <LottieScroll animationData={animationData} />
   <section className='section-6 section' >
      <div className="container">
        <div className="section-box-6">
          <h2 className='text-center' >Hello! |<br/> Lottie Animation</h2>
        </div>
      </div>
   </section>
   <section className='section-5' >
      <div className="container">
        <div className="section-box-5 flex justify-center items-center">
          <h2>Footer</h2>
        </div>
      </div>
   </section>
   </>
  );
}

export default App;
