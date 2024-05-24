"use client";
import React from "react";
import { navbarItems } from "./navbar.data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-3 ">
        {navbarItems.map((item, index) => (
          <li
            key={index}
            className={`hover:opacity-80 transition duration-150 ${
              pathname === item.link && "text-violet-300"
            }`}
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
