"use client";
import { motion } from "framer-motion";
import s from "@/app/page.module.scss";

const AboutContent = () => {
  return (
    <article className="prose text-left pl-12 pr-12">
      <motion.h2
        className={`
        ${s.title}
        md:text-7xl 
        lg:text-7xl
        text-4xl 
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
        A lil' bit about me.
      </motion.h2>

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
        I am a passionate and experienced Senior Software Engineer with over a decade of experience.
        I've worked on high traffic, intricate websites for large-scale clients such as Qantas, Transport NSW, Macquarie Bank,
        and many more.
        I've created complex webapps .
      </motion.h2>
    </article>
  );
};

export default AboutContent;
