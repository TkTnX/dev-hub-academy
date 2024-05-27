import React from "react";
import { navbarItems } from "../Header/navbar.data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu: React.FC<{closeMenu: (b: boolean) => void}> = ({closeMenu}) => {
  const pathname = usePathname();

  return (
    <div className="w-full p-9 h-dvh bg-purple-500 absolute left-0 top-0 ">
      <ul className="mt-20 grid gap-10">
        {navbarItems.map((item, index) => (
          <li
            onClick={() => closeMenu(false)}
            key={index}
            className={`hover:opacity-80 transition duration-150 ${
              pathname === item.link && "text-violet-300"
            }`}
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
