import { MAIN_LINKS, PORTFOLIO_LINKS } from "@/utils/constants";

// Used to merge navs from different sources and maintain the correct order
export const generateRouteHierarchy = (
  links: { id: number; name: string; href: string }[],
): Record<string, number> => {
  const routeHierarchy: Record<string, number> = {};
  links.forEach((link) => {
    routeHierarchy[link.href] = link.id;
  });
  return routeHierarchy;
};

export const routesHierarchy = {
  ...generateRouteHierarchy(MAIN_LINKS),
  ...generateRouteHierarchy(PORTFOLIO_LINKS),
};



export const primaryRoutesHeirarchy = generateRouteHierarchy(MAIN_LINKS);
export const portfolioRoutesHeirarchy = generateRouteHierarchy(PORTFOLIO_LINKS);
export const sortedRoutes = sortRoutes(routesHierarchy);
export const sortedPrimaryRoutes = sortRoutes(primaryRoutesHeirarchy);
export const sortedPortfolioRoutes = sortRoutes(portfolioRoutesHeirarchy);

export function sortRoutes(routes: any) {
  return Object.keys(routes).sort((a, b) => {
    return routesHierarchy[a] - routesHierarchy[b];
  });
}

export const getAnimationOutVariable = (
  routes: any,
  pathname: string,
  previousRoute: string | null,
  pathIsPortfolioItem: boolean,
  previousPathIsPortfolio: boolean | undefined,
) => {
  if (
    previousRoute !== null &&
    routes[pathname] < routes[previousRoute]
  ) {
    return {
      initial: { y: 0, x: 0, opacity: 1 },
      animate: {
        y: pathIsPortfolioItem && previousPathIsPortfolio ? 0 : "50%",
        x: pathIsPortfolioItem && previousPathIsPortfolio ? "80%" : 0,
        ease: [0.6, 0.01, 0.05, 0.9],
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
      x: pathIsPortfolioItem && previousPathIsPortfolio ? "-80%" : 0,
      ease: [0.6, 0.01, 0.05, 0.9],
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
};

export const getAnimationInVariable = (
  routes: any,
  pathname: string,
  previousRoute: string | null,
  pathIsPortfolioItem: boolean,
  previousPathIsPortfolio: boolean | undefined,
) => {
  if (
    previousRoute !== null &&
    routes[pathname] < routes[previousRoute]
  ) {
    return {
      initial: {
        y: pathIsPortfolioItem && previousPathIsPortfolio ? 0 : "-50%",
        x: pathIsPortfolioItem && previousPathIsPortfolio ? "-80%" : 0,
        ease: [0.6, 0.01, 0.05, 0.9],

        opacity: 0,
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
      x: pathIsPortfolioItem && previousPathIsPortfolio ? "80%" : 0,
      ease: [0.6, 0.01, 0.05, 0.9],

      opacity: 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
    },
  };
};
