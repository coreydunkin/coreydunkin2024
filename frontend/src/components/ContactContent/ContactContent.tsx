"use client";
import { motion } from "framer-motion";
import s from "@/app/page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
import {PageFields} from "@/lib/contentful/createService";

type ContactContentProps = {
  data: PageFields;
}

const ContactContent = ({data}: ContactContentProps) => {
  if(!data) return null;
  console.log('contact: ', data)
  const { title,subtitle, contactCard } = data;
  const {
    email,
    emailUrl,
    jobTitle,
    name,
    phoneNumber,
    phoneUrl,
    profileImage,
    socials
  } = contactCard.fields;
  const {
    description,
    file
  } = profileImage.fields;
  console.log('socials: ', socials);
  return (
    <article className="prose text-left pl-12 pr-12 md:pl-16 md:pr-16 overflow-visible">
      <motion.h3
        className={`
        ${s.title}
        text-4xl
        md:text-6xl 
        lg:text-6xl 
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
          delay: 0.2,
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        {title}
      </motion.h3>

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
          delay: 0.6,
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        {subtitle}
      </motion.h2>

      <motion.div
        className="flex flex-col rounded-xl p-4 md:p-6 bg-gray-300 border-[1px] border-gray-100 shadow-lg"
        initial={{ opacity: 0, y: 100, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        whileHover={{
          rotate: 0,
          transition: {
            delay: 0,
            ease: [0.6, 0.01, 0.05, 0.9],
            duration: 0.2,
          },
        }}
        transition={{
          duration: 1,
          delay: 0.8,
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
      >
        <div className="flex items-center gap-x-4">
          <Image
            className="rounded-full w-20 h-20  mt-0 md:mt-5"
            width={80}
            height={80}
            src="/contact/coreydunkin.jpeg"
            alt="Image Description"
          />
          <div className="grow md:ml-4">
            <h3 className="font-bold font-playfairDisplay text-gray-800 mt-0 md:mt-0">
              Corey Dunkin
            </h3>
            <p className="text-xs uppercase text-gray-500 hidden md:block">
              Senior Software Engineer
            </p>
            <p className="text-xs text-gray-500 text-decoration-none">
              <a
                href="tel:+61434090596"
                className="text-xs text-gray-500 text-decoration-none"
              >
                0434 090 596
              </a>
            </p>
            <p className="text-xs text-gray-500 text-decoration-none">
              <a
                href="mailto:corey.dunkin@gmail.com"
                className="text-xs text-gray-500 text-decoration-none"
              >
                corey.dunkin@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-0 md:mt-3 space-x-2 md:space-x-4 ml-[5.8rem] md:ml-28">
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-lg font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            href="https://github.com/coreydunkin"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-lg font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            href="https://www.linkedin.com/in/coreydunkin/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-lg font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            href="mailto:corey.dunkin@gmail.com"
          >
            <HiOutlineMail />
          </a>
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-lg font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            href="tel:+61434090596"
          >
            <FaPhone />
          </a>
        </div>
      </motion.div>
    </article>
  );
};

export default ContactContent;
