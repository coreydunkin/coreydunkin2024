import { PortfolioItemType } from "@/components/PortfolioNav/PortfolioItem";
import Link from "next/link";
import { LiaCaretLeftSolid, LiaCaretRightSolid } from "react-icons/lia";

type CaretNavigationProps = {
  portfolioLinks: PortfolioItemType[];
  currentPath: string;
};

const PortfolioCaret = ({
  portfolioLinks,
  currentPath,
}: CaretNavigationProps) => {
  const currentIndex = portfolioLinks.findIndex(
    (link) => link.href === currentPath,
  );
  const previousLink = portfolioLinks[currentIndex - 1];
  const nextLink = portfolioLinks[currentIndex + 1];

  return (
    <>
      <Link href={previousLink ? previousLink.href : "#"}>
        <button
          type="button"
          disabled={!previousLink}
          className={`fixed md:min-h-screen bottom-1 left-4 px-2 py-1 rounded-md ${
            !previousLink ? "opacity-50" : ""
          }`}
        >
          <LiaCaretLeftSolid className="m-2 pt-0 w-12 h-12 text-white" />
        </button>
      </Link>

      <Link href={nextLink ? nextLink.href : "#"}>
        <button
          type="button"
          disabled={!nextLink}
          className={`fixed md:min-h-screen bottom-1 right-4 px-2 py-1 rounded-md ${
            !nextLink ? "opacity-50" : ""
          }`}
        >
          <LiaCaretRightSolid className="m-2 pt-0 w-12 h-12 text-white" />
        </button>
      </Link>
    </>
  );
};

export default PortfolioCaret;
