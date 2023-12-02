"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
// build the nav out of the routes
export default function PortfolioNav() {
  const pathname = usePathname();
  if(!pathname.includes("portfolio")) {
    return null;
  }
  return (
    <div className="fixed z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <Link href="/portfolio/test">
        <button
          type="button"
          className={`w-3 h-3 ${pathname === "/portfolio/test" ? "opacity-100" : "opacity-30"} rounded-full bg-white`}
        ></button>
      </Link>
      <Link href="/portfolio/test2">
        <button
          type="button"
          className={`w-3 h-3 ${pathname === "/portfolio/test2" ? "opacity-100" : "opacity-30"} rounded-full bg-white`}
        ></button>
      </Link>
      <Link href="/portfolio/test3">
        <button
          type="button"
          className={`w-3 h-3 ${pathname === "/portfolio/test3" ? "opacity-100" : "opacity-30"} rounded-full bg-white`}
        ></button>
      </Link>
    </div>
  )
}