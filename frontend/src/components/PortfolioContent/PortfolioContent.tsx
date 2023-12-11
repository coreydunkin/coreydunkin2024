"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useColorStore } from "@/stores/colorStore";
import { useEffect, useState } from "react";
import { COLOR_GRADIENT } from "@/utils/constants";
import getMonochromaticColors from "@/utils/getMonochromaticColors";
import { TbBrandNextjs } from "react-icons/tb";
import { shade } from "polished";
import GetIcon from "@/utils/GetIcon";

const PortfolioContent = ({ content }: any) => {
  const setColorValues = useColorStore((state) => state.setColorValues);
  const [isTapped, setIsTapped] = useState(false);
  const [contrastColor, setContrastColor] = useState("#000000");

  const imageVariants = {
    up: { y: -200 },
    down: { y: 0 },
  };

  useEffect(() => {
    setColorValues(
      (content?.mainColor && getMonochromaticColors(content.mainColor)) ||
        COLOR_GRADIENT,
    );
    setContrastColor(shade(0.2, content?.mainColor || "#000000"));
  }, []);
  if (!content) return null;
  return (
    <section className="overflow-hidden m-10 mt-0 mb-20 md:m-20 bg-white max-h-[calc(75dvh)] bg-opacity-70 py-8 sm:py-16 rounded-md border-[1px] border-gray-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 md:gap-y-0 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2
                style={{ color: `${contrastColor}` }}
                className={`text-base font-semibold leading-7 text-red-600`}
              >
                {content.title}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-playfairDisplay">
                {content.subtitle}
              </p>
              <p className="mt-3 md:mt-6 text-lg leading-8 text-gray-600">
                {content.blurb}{" "}
                <span className="inline md:hidden">{content.mobileBlurb}</span>
              </p>
              <ul className="space-y-7 hidden md:block mt-10">
                {/*<li className="flex space-x-3 items-center">*/}
                {/*  <div className="flex items-center justify-center">*/}
                {/*    <TbBrandNextjs className="text-red-600 w-8 h-8 " />*/}
                {/*  </div>*/}
                {/*  <span className="text-gray-600">*/}
                {/*    <span className="font-bold">Next.js:</span> Enhanced our project with its efficient page loading and SEO benefits, providing a smooth user experience.*/}
                {/*  </span>*/}
                {/*</li>*/}
                {/*<li className="flex space-x-3 items-center">*/}
                {/*  <div className="flex items-center justify-center">*/}
                {/*    <TbBrandTypescript className="text-red-600 w-7 h-7 " />*/}
                {/*  </div>*/}
                {/*  <span className="text-gray-600">*/}
                {/*    <span className="font-bold">Typescript:</span> Ensured robust and reliable code, making the project easier to maintain and reducing errors.*/}
                {/*  </span>*/}
                {/*</li>*/}
                {/*<li className="flex space-x-3 items-center">*/}
                {/*  <div className="flex items-center justify-center">*/}
                {/*    <SiContentful className="text-red-600 w-7 h-7 " />*/}
                {/*  </div>*/}
                {/*  <span className="text-gray-600">*/}
                {/*    <span className="font-bold">Contentful:</span> Facilitated seamless content management, empowering our content editors to update and distribute content with ease.*/}
                {/*  </span>*/}
                {/*</li>*/}
                {content.listItems.map((item: any, key: number) => (
                  <li key={key} className="flex space-x-3 items-center">
                    <div className="flex items-center justify-center">
                      {GetIcon(contrastColor, item.icon)}
                    </div>
                    <span className="text-gray-600">
                      <span className="font-bold">{item.name}:</span>{" "}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={content.link}
              passHref
              className="mt-4 md:mt-10 flex items-center gap-x-6"
            >
              <button
                style={{ backgroundColor: `${contrastColor}` }}
                className={`rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
              >
                View site
              </button>
            </Link>
          </div>
          <Image
            src={content.image}
            alt="Product screenshot"
            className="hidden md:block w-full md:w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0"
            width="768"
            height="641"
          />
          <motion.div
            className="relative md:hidden"
            animate={isTapped ? "up" : "down"}
            variants={imageVariants}
            onTap={() => {
              setIsTapped(!isTapped);
            }}
          >
            <Image
              src={content.imageMobile}
              alt="Product screenshot"
              className="block w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10"
              width="245"
              height="533"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: !isTapped ? 1 : 0 }}
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black px-4 py-2 rounded-md text-white text-sm bg-black bg-opacity-50 font-light"
            >
              Tap to view
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioContent;
