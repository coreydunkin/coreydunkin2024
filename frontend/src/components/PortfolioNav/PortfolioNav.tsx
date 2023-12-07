"use client";
import PortfolioItem from "@/components/PortfolioNav/PortfolioItem";
import { usePathname } from "next/navigation";
import { PORTFOLIO_LINKS } from "@/utils/constants";
import PortfolioCaret from "@/components/PortfolioNav/PortfolioCaret";
// build the nav out of the routes
export default function PortfolioNav() {
  const pathname = usePathname();
  if (!pathname.includes("portfolio")) {
    return null;
  }
  return (
    <>
      <div className="fixed z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {PORTFOLIO_LINKS.map((portfolioLink) => (
          <PortfolioItem
            key={portfolioLink.id}
            link={portfolioLink}
            pathname={pathname}
          />
        ))}
      </div>
      <PortfolioCaret portfolioLinks={PORTFOLIO_LINKS} currentPath={pathname} />
    </>
  );
}
