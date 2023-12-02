"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePreviousRoute from "@/utils/usePreviousRoute";
import {generateRouteHierarchy} from "@/utils/generateRouteHierarchy";
import {MAIN_LINKS, PORTFOLIO_LINKS} from "@/utils/constants";

// Change this to go inside a CONSTANTS or look into index?
// const routesHierarchy: Record<string, number> = {
//   "/": 0,
//   "/about": 1,
//   "/portfolio": 2,
//   "/portfolio/test": 3,
//   "/portfolio/test2": 4,
//   "/portfolio/test3": 5,
//   "/contact": 6,
// };
const routesHierarchy = {...generateRouteHierarchy(MAIN_LINKS), ...generateRouteHierarchy(PORTFOLIO_LINKS)};
console.log(routesHierarchy)


// This wil be used to increment/decrement the page route on mouse scroll and swipe
const getRouteByValue = (value: number): string | undefined => {
  return Object.keys(routesHierarchy).find(
    (key) => routesHierarchy[key] === value,
  );
};

const getAnimationOutVariable = (
  pathname: string,
  previousRoute: string | null,
  pathIsPortfolioItem: boolean,
  previousPathIsPortfolio: boolean | undefined
) => {

  if (
    previousRoute !== null &&
    routesHierarchy[pathname] < routesHierarchy[previousRoute]
  ) {
    return {
      initial: { y: 0, x: 0, opacity: 1 },
      animate: {
        y: pathIsPortfolioItem && previousPathIsPortfolio ? 0 : "50%",
        x: pathIsPortfolioItem && previousPathIsPortfolio ? "50%" : 0,
        opacity: 0,
        transitionEnd: {
          display: "none",
        },
      },
    };
  }
  return {
    initial: { y: 0, x: 0, opacity: 1 },
    animate: {
      y: pathIsPortfolioItem && previousPathIsPortfolio ? 0 : "-50%",
      x: pathIsPortfolioItem && previousPathIsPortfolio ? "-50%" : 0,
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
};

const getAnimationInVariable = (
  pathname: string,
  previousRoute: string | null,
  pathIsPortfolioItem: boolean,
  previousPathIsPortfolio: boolean | undefined
) => {
  if (
    previousRoute !== null &&
    routesHierarchy[pathname] < routesHierarchy[previousRoute]
  ) {
    return {
      initial: {
        y: pathIsPortfolioItem && previousPathIsPortfolio ? 0 : "-50%",
        x: pathIsPortfolioItem && previousPathIsPortfolio ? "-50%" : 0,
        opacity: 0
      },
      animate: {
        y: 0,
        x: 0,
        opacity: 1,
      },
    };
  }
  return {
    initial: {
      y: pathIsPortfolioItem && previousPathIsPortfolio ? 0 : "50%",
      x: pathIsPortfolioItem && previousPathIsPortfolio ? "50%" : 0,
      opacity: 0
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
    },
  };
};
export const LayoutTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const previousRoute = usePreviousRoute();
  const pathname = usePathname();
  const lastPageRef = useRef<HTMLCollection | null>(null);
  const currentPageRef = useRef<HTMLDivElement>(null);
  const exitAnimationDivRef = useRef<HTMLDivElement>(null);
  const pathIsPortfolioItem = pathname.includes("portfolio/");
  const previousPathIsPortfolio = previousRoute?.includes("portfolio/");

  useEffect(() => {
    if (!currentPageRef.current) return;
    if (!lastPageRef.current)
      lastPageRef.current = currentPageRef.current.children;

    exitAnimationDivRef.current?.appendChild(
      lastPageRef.current![0].cloneNode(true),
    );
    lastPageRef.current = currentPageRef.current.children;
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      <div className="relative h-screen w-screen">
        <motion.div
          key={pathname + "exit-animation"}
          {...getAnimationOutVariable(pathname, previousRoute, pathIsPortfolioItem, previousPathIsPortfolio)}
          transition={{
            type: "ease-in-out",
            duration: 0.7,
          }}
          className="fixed w-full h-full"
        >
          <div ref={exitAnimationDivRef} />
        </motion.div>

        <motion.div
          key={pathname}
          {...getAnimationInVariable(pathname, previousRoute, pathIsPortfolioItem, previousPathIsPortfolio)}
          transition={{ type: "ease-in-out", duration: 0.7 }}
          className="w-screen h-screen"
        >
          <div ref={currentPageRef}>{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LayoutTransition;
