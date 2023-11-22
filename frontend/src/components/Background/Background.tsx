'use client';
import React, {useEffect, useRef} from "react";
import s from "./Background.module.scss";
import Particles from "@/components/Background/Particles/Particles";

const Background = () => {
  const animationRef = useRef(null);
  const scrollYRef = useRef(0);
  const timeRef = useRef(Math.random() * 10000);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = (time) => {
      animationRef.current = requestAnimationFrame(animate);
      const el = document.body;
      timeRef.current += 0.005; // This will make it more unpredictable
      el.style.setProperty('--posX', ((Math.sin(timeRef.current) + 1) / 2) * 500);
      el.style.setProperty('--posY', ((Math.cos(timeRef.current) + 1) / 2) * 500 + scrollYRef.current / 10);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  return (
    <>
      <Particles />
      <section className={s.background} />
    </>
  );
};

export default Background;