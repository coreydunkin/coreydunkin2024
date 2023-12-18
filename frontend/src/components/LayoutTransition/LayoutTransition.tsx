"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePreviousRoute from "@/utils/usePreviousRoute";
import {
  generateRouteHierarchy,
  getAnimationInVariable,
  getAnimationOutVariable,
  routesHierarchy,
} from "@/components/LayoutTransition/utils";
import { useRouteStore } from "@/stores/routeStore";

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
  const routes = generateRouteHierarchy(
    useRouteStore((state) => state.routeValues),
  );

  useLayoutEffect(() => {
    if (!currentPageRef.current) return;
    if (!lastPageRef.current)
      lastPageRef.current = currentPageRef.current.children;

    exitAnimationDivRef.current?.appendChild(
      lastPageRef.current![0].cloneNode(true),
    );
    lastPageRef.current = currentPageRef.current.children;
  }, [pathname]);

  return (
    <AnimatePresence initial={routes[pathname] > 1 ? false : true}>
      <div className="relative h-screen w-screen hover:cursor-grab active:cursor-grabbing">
        <motion.div
          key={pathname + "exit-animation"}
          {...getAnimationOutVariable(
            routes,
            pathname,
            previousRoute,
            pathIsPortfolioItem,
            previousPathIsPortfolio,
          )}
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
          {...getAnimationInVariable(
            routes,
            pathname,
            previousRoute,
            pathIsPortfolioItem,
            previousPathIsPortfolio,
          )}
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
