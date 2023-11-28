"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePreviousRoute from "@/utils/usePreviousRoute";

// Change this to go inside a CONSTANTS or look into index?
const routesHierarchy: Record<string, number> = {
  "/": 0,
  "/about": 1,
  "/portfolio": 2,
  "/contact": 3,
};

const getAnimationOutVariable = (
  pathname: string,
  previousRoute: string | null,
) => {
  if (
    previousRoute !== null &&
    routesHierarchy[pathname] < routesHierarchy[previousRoute]
  ) {
    return {
      initial: { y: 0, x: 0 },
      animate: {
        y: "100%",
        x: 0,
        transitionEnd: {
          display: "none",
        },
      },
    };
  }
  return {
    initial: { y: 0, x: 0 },
    animate: {
      y: "-100%",
      x: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
};

const getAnimationInVariable = (
  pathname: string,
  previousRoute: string | null,
) => {
  if (
    previousRoute !== null &&
    routesHierarchy[pathname] < routesHierarchy[previousRoute]
  ) {
    return {
      initial: { y: "-100%", x: 0 },
      animate: {
        y: 0,
        x: 0,
      },
    };
  }
  return {
    initial: { y: "100%", x: 0 },
    animate: {
      y: 0,
      x: 0,
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
          {...getAnimationOutVariable(pathname, previousRoute)}
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
          {...getAnimationInVariable(pathname, previousRoute)}
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
