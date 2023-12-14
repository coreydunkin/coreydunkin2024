"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  sortedPortfolioRoutes,
  sortedPrimaryRoutes,
} from "@/components/LayoutTransition/utils";
import { motion, PanInfo } from "framer-motion";
import { useGesture } from "react-use-gesture";
import debounce from "lodash.debounce";

const DirectionRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  function checkOffset(
    offset: number,
    minVal: number,
    maxVal: number,
    leftOrUp: string,
    rightOrDown: string,
  ) {
    if (offset < minVal) {
      if (leftOrUp === "up") {
        const currentPosition = sortedPrimaryRoutes.indexOf(pathname);
        if (pathname.startsWith("/portfolio")) {
          const portfolioMainPage = sortedPortfolioRoutes[0];
          const portfolioMainPageIndex =
            sortedPrimaryRoutes.indexOf(portfolioMainPage);
          if (portfolioMainPageIndex < sortedPrimaryRoutes.length - 1) {
            router.push(sortedPrimaryRoutes[portfolioMainPageIndex + 1]);
          }
        } else if (currentPosition < sortedPrimaryRoutes.length - 1) {
          router.push(sortedPrimaryRoutes[currentPosition + 1]);
        }
      }
      if (leftOrUp === "left") {
        const currentPosition = sortedPortfolioRoutes.indexOf(pathname);
        if (currentPosition < sortedPortfolioRoutes.length - 1) {
          router.push(sortedPortfolioRoutes[currentPosition + 1]);
        }
      }
    } else if (offset > maxVal) {
      if (rightOrDown === "down") {
        const currentPosition = sortedPrimaryRoutes.indexOf(pathname);
        if (pathname.startsWith("/portfolio")) {
          const portfolioMainPage = sortedPortfolioRoutes[0];
          const portfolioMainPageIndex =
            sortedPrimaryRoutes.indexOf(portfolioMainPage);
          if (portfolioMainPageIndex > 0) {
            router.push(sortedPrimaryRoutes[portfolioMainPageIndex - 1]);
          }
        } else if (currentPosition > 0) {
          router.push(sortedPrimaryRoutes[currentPosition - 1]);
        }
      }
      if (rightOrDown === "right") {
        const currentPosition = sortedPortfolioRoutes.indexOf(pathname);
        if (currentPosition > 0) {
          router.push(sortedPortfolioRoutes[currentPosition - 1]);
        }
      }
    }
  }

  const bind = () => ({
    onDragEnd: (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (pathname.startsWith("/portfolio")) {
        checkOffset(info.offset.x, -50, 50, "left", "right");
      }
      checkOffset(info.offset.y, -50, 50, "up", "down");
    },
  });

  const handleScroll = debounce((direction) => {
    const [dx, dy] = direction;
    const scrollDirection = dy > 0 ? "down" : "up";
    if (scrollDirection === "up") {
      checkOffset(51, -50, 50, "up", "down");
    } else {
      checkOffset(-51, -50, 50, "up", "down");
    }
  }, 200);

  const wheelBind = useGesture({
    onWheel: ({ direction }) => {
      // Call the debounce function
      handleScroll(direction);
    },
  });

  return (
    <motion.div
      drag={pathname.startsWith("/portfolio") ? true : "y"}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragDirectionLock={true}
      dragSnapToOrigin={true}
      {...bind()}
      {...wheelBind()}
    >
      {children}
    </motion.div>
  );
};

export default DirectionRoute;
