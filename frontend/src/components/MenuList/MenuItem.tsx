import Link from "next/link";

type LinkType = {
  id: number;
  name: string;
  href: string;
};

type MenuItemProps = {
  link: LinkType;
  pathName: string;
  setIsOpen: (isOpen: boolean) => void;
  isLast: boolean;
};
const MenuItem = ({ link, pathName, setIsOpen, isLast }: MenuItemProps) => (
  <>
    <li key={link.id}>
      <Link
        onClick={() => setIsOpen(false)}
        href={link.href}
        className={`${
          pathName === link.href && "border-b-white "
        } transition-all border-b-2 hover:border-b-white border-b-[rgba(0,0,0,0)] block py-2 px-3 text-white md:bg-transparent md:p-0`}
        aria-current="page"
      >
        {link.name}
      </Link>
    </li>
    {/* Add separator for all but the last item */}
    {!isLast && (
      <li className="opacity-50 hidden md:block">&#x2022;</li>
    )}
  </>
);

export default MenuItem;