"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<string | null>(null);
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return null;
}
