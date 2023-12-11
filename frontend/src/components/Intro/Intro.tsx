"use client";
import { motion } from "framer-motion";
import s from "@/app/page.module.scss";
import Link from "next/link";
import Button from "@/components/Button/Button";

const Intro = () => {
  return (
    <article className="prose text-left px-12 md:px-16 pt-28 md:pt-0">
      <motion.h1
        className={`
        ${s.title}
        text-7xl 
        md:text-9xl 
        lg:text-9xl 
        mb-5 
        text-gray-200 
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
        Corey Dunkin.
      </motion.h1>

      <motion.h2
        className="
        text-gray-100
        font-thin
        mt-0
        text-1xl
        text-shadow-sm
   "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.6, //h2 starts after 0.6s
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        Senior Software Engineer in Sydney, Australia.
      </motion.h2>
      <Button href={"/about"} text={"View more"} animate={true} />
    </article>
  );
};

export default Intro;
