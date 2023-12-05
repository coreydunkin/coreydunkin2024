"use client";
import { motion } from "framer-motion";
import s from "@/app/page.module.scss";
import { FaJenkins, FaNodeJs, FaReact } from "react-icons/fa";
import { TbBrandAzure, TbBrandNextjs, TbBrandTypescript } from "react-icons/tb";
import { FaAngular } from "react-icons/fa6";
import { SiAzuredevops } from "react-icons/si";
import Link from "next/link";
import Button from "@/components/Button/Button";

const AboutContent = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
        className="w-20 hidden md:flex flex-col justify-between items-center"
      >
        <FaReact className="m-2 pt-0 w-8 h-8" />
        <TbBrandNextjs className="m-2 w-8 h-8" />
        <FaAngular className="m-2 w-8 h-8" />
        <FaNodeJs className="m-2 w-8 h-8" />
        <TbBrandTypescript className="m-2 w-8 h-8" />
      </motion.div>
      <div className="">
        <article className="prose text-left pl-12 pr-12">
          <motion.h2
            className={`
        ${s.title}
        md:text-5xl 
        lg:text-5xl
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
            A lil` bit about me.
          </motion.h2>

          <motion.div
            className="
        text-gray-100
        font-thin
        mt-0
        text-xl
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
            <p>
              I am a passionate and experienced Senior Software Engineer with
              over a decade of experience. I have worked on high traffic,
              intricate websites for large-scale clients such as{" "}
              <Link className="text-white" href="/portfolio/test">
                Qantas
              </Link>
              ,{" "}
              <Link className="text-white" href="/portfolio/test2">
                Transport NSW
              </Link>
              ,{" "}
              <Link className="text-white" href="/portfolio/test3">
                Macquarie Bank
              </Link>
              , and many more.
            </p>
            <p className="hidden md:block">
              I am a seasoned Senior Software Engineer with expertise in
              building complex web applications using React, Next.js, Angular,
              and Node.js. My proficiency in TypeScript contributes to
              developing robust and scalable solutions. Additionally, I have a
              strong background in implementing efficient CI/CD pipelines,
              enhancing deployment processes and code quality.
            </p>
          </motion.div>

          <Button href={'/portfolio/test'} text={'View my work'} animate={true} />
        </article>
      </div>
    </div>
  );
};

export default AboutContent;
