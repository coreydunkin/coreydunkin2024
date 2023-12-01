"use client";
import { motion } from "framer-motion";
import s from "@/app/page.module.scss";

const PortfolioContent = () => {
  return (
    <article className="prose text-left pl-12 pr-12 md:pl-16 md:pr-16">
      <motion.h1
        className={`
        ${s.title}
        md:text-9xl 
        lg:text-9xl 
        mb-5 
        text-gray-100 
        text-outline--white
        font-playfairDisplay
        text-shadow-sm
    `}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.2, //h1 starts after 0.2s
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        Portfolio.
      </motion.h1>

      <motion.h2
        className="
        text-gray-100
        font-thin
        mt-0
        text-1xl
        text-shadow-sm
   "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.6, //h2 starts after 0.6s
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        This is the portfolio page.
      </motion.h2>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
      </div>
    </article>
  );
};

export default PortfolioContent;
