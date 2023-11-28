"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    // <nav className="border-b-white border-b-[1px]">
    <nav
      className={`${
        isOpen && "bg-blend-multiply bg-gray-800 min-h-screen bg-opacity-50"
      } fixed min-w-full z-10 md:bg-none md:bg-opacity-0 md:min-h-0`}
    >
      <motion.div
        className="flex flex-wrap items-center justify-between mx-auto pt-5 pb-6 pl-8 pr-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 0.5,
          ease: [0.6, 0.01, 0.05, 0.9],
        }}
      >
        <Link
          href="/"
          className={`${
            pathName !== "/" ? "opacity-1" : "opacity-0"
          } flex items-center space-x-3 rtl:space-x-reverse`}
        >
          <h1
            className="
            self-center
            text-2xl
            font-bold
            font-playfairDisplay
            font-extrabold
            text-3xl
            whitespace-nowrap
            text-gray-100
            text-shadow-sm
            "
          >
            Corey Dunkin.
          </h1>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen ? true : false)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            !isOpen && "hidden"
          } text-right right-4 z-10 w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-playfairDisplay font-light text-2xl text-shadow-sm flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/"
                className={`${
                  pathName === "/" && "border-b-white "
                } transition-all border-b-2 hover:border-b-white border-b-[rgba(0,0,0,0)] block py-2 px-3 text-white md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="opacity-50 hidden md:block">&#x2022;</li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/about"
                className={`${
                  pathName === "/about" && "border-b-white "
                } transition-all border-b-2 hover:border-b-white border-b-[rgba(0,0,0,0)] block py-2 px-3 text-white md:bg-transparent md:p-0`}
                aria-current="page"
              >
                About
              </Link>
            </li>
            <li className="opacity-50 hidden md:block">&#x2022;</li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/portfolio"
                className={`${
                  pathName === "/portfolio" && "border-b-white "
                } transition-all border-b-2 hover:border-b-white border-b-[rgba(0,0,0,0)] block py-2 px-3 text-white md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Portfolio
              </Link>
            </li>
            <li className="opacity-50 hidden md:block">&#x2022;</li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="/contact"
                className={`${
                  pathName === "/contact" && "border-b-white "
                } transition-all border-b-2 hover:border-b-white  border-b-[rgba(0,0,0,0)] block py-2 px-3 text-white md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </nav>
  );
}
