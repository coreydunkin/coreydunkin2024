"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useColorStore } from "@/stores/colorStore";
import { useEffect, useState } from "react";
import { COLOR_GRADIENT } from "@/utils/constants";
import getMonochromaticColors from "@/utils/getMonochromaticColors";
import { shade } from "polished";
import GetIcon from "@/utils/GetIcon";
import {PortfolioFields} from "@/lib/contentful/createService";

type PortfolioContentProps = {
  data: PortfolioFields;
}

const PortfolioContent = ({data}: PortfolioContentProps | any) => {
  const { color, company, project, blurb, mobileBlurb, portfolioList, image, mobileImage, cta } = data;
  const portfolioListItems = portfolioList.map((item: any) => {
    const { icon, listBlurb, type } = item.fields;
    return {
      icon,
      listBlurb,
      type
    }
  });
  const {linkText, linkUrl} = cta.fields;

  const setColorValues = useColorStore((state) => state.setColorValues);
  const [isTapped, setIsTapped] = useState(false);
  const [contrastColor, setContrastColor] = useState("#000000");

  const imageVariants = {
    up: { y: -200 },
    down: { y: 0 },
  };

  useEffect(() => {
    setColorValues(
      (color && getMonochromaticColors(color)) ||
        COLOR_GRADIENT,
    );
    setContrastColor(shade(0.2, color || "#000000"));

  }, []);
  if(!data) return null;
  return (
    <section className="overflow-hidden my-20 mx-10 md:m-20 bg-white max-h-[75dvh] bg-opacity-70 py-8 veryshort:px-0  rounded-md border-[1px] border-gray-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 md:gap-y-0 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2
                style={{ color: `${contrastColor}` }}
                className={`text-base font-semibold leading-7 text-red-600`}
              >
                {company}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-playfairDisplay">
                {project}
              </p>
              <p className="mt-3 md:mt-6 text-lg leading-8 text-gray-600">
                {blurb}{" "}
                <span className="inline md:hidden short:inline">
                  {mobileBlurb}
                </span>
              </p>
              <ul className="space-y-7 hidden md:block short:hidden mt-10">
                {portfolioListItems.map((item: any, key: number) => (
                  <li key={key} className="flex space-x-3 items-center">
                    <div className="flex items-center justify-center">
                      {GetIcon(contrastColor, item.icon)}
                    </div>
                    <span className="text-gray-600">
                      <span className="font-bold">{item.type}:</span>{" "}
                      {item.listBlurb}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={linkUrl}
              passHref
              className="mt-4 md:mt-10 flex items-center gap-x-6 portrait:mb-5 sm:mb-5"
            >
              <button
                style={{ backgroundColor: `${contrastColor}` }}
                className={`rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
              >
                {linkText}
              </button>
            </Link>
          </div>
          <Image
            src={`https:${image.fields.file.url}`}
            alt={image.fields.title}
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
              src={`https:${mobileImage.fields.file.url}`}
              alt={mobileImage.fields.title}
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
