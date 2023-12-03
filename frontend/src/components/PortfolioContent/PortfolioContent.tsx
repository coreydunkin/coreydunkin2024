"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { extractColors } from 'extract-colors'
import { usePathname } from "next/navigation";
import {useColorStore} from "@/stores/colorStore";
import {useEffect} from "react";
import s from "./PortfolioContent.module.scss";

const PortfolioContent = () => {
  const setColorValues = useColorStore((state) => state.setColorValues);

  const pathName = usePathname();
  const src = pathName === '/portfolio/test' ? '/work/qantas.png' : '/work/livetraffic.png';


  useEffect(() => {
    extractColors(src)
      .then(colors => {
        const hexColors = colors.map(color => color.hex);
        setColorValues(hexColors);
      })
      .catch(console.error)
  }, []);

  return (
    <article className="prose text-left pl-12 pr-12 md:pl-16 md:pr-16">

        <div style={{ position: 'relative', height: '400px', backgroundImage: `url(${src})`, backgroundSize: "100% auto" }}>


        </div>





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
    </article>
  );
};

export default PortfolioContent;
