'use client';
import React, {useEffect, useRef} from "react";
import s from "./Background.module.scss";

const Background = () => {
  const animationRef = useRef(null);
  const scrollYRef = useRef(0);
  const timeRef = useRef(Math.random() * 10000);
  const elRef = useRef(null);

  useEffect(() => {

    // Initializations for will-change
    elRef.current.style.willChange = '--posX, --posY, --rotate';

    const handleScroll = () => {
      const newScrollY = window.scrollY;

      // Skip this frame if the scroll position did not change significantly
      if(Math.abs(scrollYRef.current - newScrollY) < 5) return;

      scrollYRef.current = newScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.005;

      const newPosX = ((Math.sin(timeRef.current) + 1) / 2) * 500;
      const newPosY = ((Math.cos(timeRef.current) + 1) / 2) * 500 + scrollYRef.current / 10;
      const newRotate = ((Math.sin(timeRef.current) + 1) / 2) * 1000;

      // Skip this frame if the new values did not significantly change
      if(
        Math.abs(elRef.current.style.getPropertyValue('--posX') - newPosX) < 5 &&
        Math.abs(elRef.current.style.getPropertyValue('--posY') - newPosY) < 5 &&
        Math.abs(elRef.current.style.getPropertyValue('--rotate') - newRotate) < 5
      ) return;

      elRef.current.style.setProperty('--posX', newPosX);
      elRef.current.style.setProperty('--posY', newPosY);
      elRef.current.style.setProperty('--rotate', newRotate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);

      // Clean up will-change
      elRef.current.style.willChange = 'auto';
    };
  }, []);

  // Added reference to the element
  return (
    <>
      <section ref={elRef} id="background" className={s.background} />
    </>
  );
};

export default Background;