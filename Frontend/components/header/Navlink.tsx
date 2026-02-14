import Link from "next/link";

export const Navlink = ({ href, title }: { href: `/${string}`; title: string }) => {
  return (
    <li className="text-2xl">
      <Link href={href}>{title}</Link>
    </li>
  );
};

