import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const LottieScroll = ({ animationData }) => {
  const lottieContainer = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    // Initialize Lottie animation
    anim.current = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animationData,
    });

    // Calculate the scroll distance for the animation
    const totalFrames = anim.current.totalFrames;

    // Create a GSAP ScrollTrigger to control the animation
    gsap.fromTo(lottieContainer.current,{
        y: '0rem',
        opacity: 0,
    }, {
        y : '-50vh',
        opacity: 1,
        scrollTrigger: {
            trigger: lottieContainer.current,
            start: `top 80%`,
            end: `250% -15%`,
            scrub: true,
            smoothScrub: 0.1,
            pin: true,
            // markers: true,
            onUpdate: (self) => {
                let frame = Math.round(self.progress * totalFrames);
                frame = Math.min(Math.max(frame, 0), totalFrames - 1);
                anim.current.goToAndStop(frame, true);
            },
            onLeave: () => {
                lottieContainer.current.style.display = 'none';
            },
            onEnter: () => {
                lottieContainer.current.style.display = '';
            },
        },
    });

    return () => {
      anim.current.destroy();
      ScrollTrigger.getById("lottie-scroll")?.kill();
    };
  }, [animationData]);

  return (
    <>
        <div className="animation-box">
            <div className="lottie-animation" ref={lottieContainer} style={{ height: "auto", width: "25rem", left: "65%" }} />
        </div>
    </>
  );
};

export default LottieScroll;
