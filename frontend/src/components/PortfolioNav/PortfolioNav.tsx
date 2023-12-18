"use client";
import PortfolioItem from "@/components/PortfolioNav/PortfolioItem";
import { usePathname } from "next/navigation";
import PortfolioCaret from "@/components/PortfolioNav/PortfolioCaret";
import { MenuListProps } from "@/components/MenuList/MenuList";

export default function PortfolioNav({ links }: MenuListProps) {
  const portfolioLinks = links.filter((link) => link.name === "portfolio");
  const pathname = usePathname();
  if (!pathname.includes("portfolio")) {
    return null;
  }
  return (
    <>
      <div className="fixed z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {portfolioLinks.map((portfolioLink: any) => (
          <PortfolioItem
            key={portfolioLink.id}
            link={portfolioLink}
            pathname={pathname}
          />
        ))}
      </div>
      <PortfolioCaret portfolioLinks={portfolioLinks} currentPath={pathname} />
    </>
  );
}
