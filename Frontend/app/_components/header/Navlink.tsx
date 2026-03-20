"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navlink = ({ href, title }: { href: `/${string}`; title: string }) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li className="text-2xl">
      <Link
        href={href}
        className={`whitespace-nowrap px-3 rounded-xl transition-colors duration-150 hover:bg-white/20 ${isActive ? "underline underline-offset-4 decoration-2" : ""}`}
      >
        {title}
      </Link>
    </li>
  );
};
