"use client";
import React, { useEffect, useState } from "react";
import { navbarItems } from "./navbar.data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "../MobileMenu/MobileMenu";

const Navbar: React.FC<{ isNotFooter: boolean }> = ({ isNotFooter = true }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    openMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, []);

  return (
    <nav
      className={`${!isNotFooter ? "order-none" : "-order-2"} vsm:order-none`}
    >
      <ul className={`${!isNotFooter ? "flex" : "hidden"} vsm:flex gap-3`}>
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
      {isNotFooter && (
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="grid relative z-20 items-center vsm:hidden w-8 h-8"
        >
          <span
            className={`bg-white h-1 rounded-lg transition duration-150 ${
              openMenu && "rotate-45 translate-y-3"
            }`}
          ></span>
          <span
            className={`bg-white h-1 rounded-lg transition duration-150 ${
              openMenu && "opacity-0"
            }`}
          ></span>
          <span
            className={`bg-white h-1 rounded-lg transition duration-150 ${
              openMenu && "-rotate-45 -translate-y-3"
            }`}
          ></span>
        </button>
      )}

      {openMenu && isNotFooter && <MobileMenu closeMenu={setOpenMenu} />}
    </nav>
  );
};

export default Navbar;
