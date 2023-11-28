"use client";
import { motion } from "framer-motion";
import s from "@/app/page.module.scss";
import Link from "next/link";

const Intro = () => {
  return (
    <article className="prose text-left pl-12 pr-12 md:pl-16 md:pr-16">
      <motion.h1
        className={`
        ${s.title}
        text-7xl 
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
      <Link href="/about" passHref>
        <motion.button
          className="
          bg-opacity-0
          bg-gray-800
          text-gray-100
          font-bold
          py-2
          px-4
          border
          border-gray-100
          mt-5
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.2, // button starts after 1.0s
            ease: [0.6, 0.01, 0.05, 0.9],
          }}
        >
          View more
        </motion.button>
      </Link>
    </article>
  );
};

export default Intro;
