import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import UserInfo from "./UserInfo";

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-3xl fixed top-0 left-0 right-0 z-10">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" width={80} height={80} alt="Логотип" />
        </Link>
        <Navbar />
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
