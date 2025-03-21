"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import usePreviousRoute from "@/utils/usePreviousRoute";
import MenuItem from "@/components/MenuList/MenuItem";
import { useRouteStore } from "@/stores/routeStore";

export interface Link {
  id: number;
  name: string;
  href: string;
}

export interface MenuListProps {
  links: Link[];
}

export default function MenuList({ links }: MenuListProps) {
  const setRouteValues = useRouteStore((state) => state.setRouteValues);
  const mainLinks = links.filter((link) => Number.isInteger(link.id));
  const [isOpen, setIsOpen] = useState(false);
  const [portfolioPath, setPortfolioPath] = useState<string | null>(null); // ["/portfolio/qantas", "/portfolio/livetraffic", "/portfolio/etoll"
  const pathName = usePathname();
  const prevPathName = usePreviousRoute();

  useEffect(() => {
    setIsOpen(false);
    if (prevPathName?.includes("/portfolio/")) {
      setPortfolioPath(prevPathName);
    }
    setRouteValues(links);
  }, [pathName]);

  return (
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
          <ul className="font-playfairDisplay text-white font-light text-2xl text-shadow-sm flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {mainLinks.map((link, index) => (
              <MenuItem
                key={link.id}
                link={link}
                pathName={pathName}
                setIsOpen={setIsOpen}
                isLast={index === mainLinks.length - 1}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </nav>
  );
}
