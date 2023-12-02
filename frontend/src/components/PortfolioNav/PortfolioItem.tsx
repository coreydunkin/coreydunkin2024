import Link from "next/link";

type PortfolioItemType = {
  id: number;
  name: string;
  href: string;
};

type PortfolioItemProps = {
  link: PortfolioItemType;
  pathname: string;
};

const PortfolioItem = ({ link, pathname }: PortfolioItemProps) => (
  <Link href={link.href}>
    <button
      type="button"
      className={`w-3 h-3 ${pathname === link.href ? "opacity-100" : "opacity-30"} rounded-full bg-white`}
    ></button>
  </Link>
);

export default PortfolioItem;