"use client";

import Background from "@/components/Background/Background";
import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import s from './page.module.scss';
import { motion } from 'framer-motion';
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">

      <div className="relative flex min-h-screen  flex-col justify-center overflow-hidden pl-12 pr-12 lg:p-96">
        <article className="prose text-left text-white">
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
              duration: 0.8,
              delay: 0.2, //h1 starts after 0.2s
              ease: [0.6, 0.01, 0.05, 0.9]
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
        text-shadow-md
   "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6, //h2 starts after 0.6s
              ease: [0.6, 0.01, 0.05, 0.9]
            }}
          >
            Senior Software Engineer in Sydney, Australia.
          </motion.h2>

          <motion.button
            className="transition-opacity bg-opacity-0 bg-gray-800 hover:bg-opacity-20 text-gray-100 font-bold py-2 px-4 border border-gray-100 mt-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.0, // button starts after 1.0s
              ease: [0.6, 0.01, 0.05, 0.9]
            }}
          >
            View more
          </motion.button>
        </article>
      </div>



      {/*<Background />*/}
      <BackgroundCanvas />
    </main>
  )
}
