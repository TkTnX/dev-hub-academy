import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "../Header/Navbar";

const Footer: React.FC = () => {
  return (
    <footer
      className="backdrop-blur-3xl mt-auto"
      style={{ backgroundColor: "#335782" }}
    >
      <div className="container grid justify-center items-center">
        <Link className="justify-self-center" href="/">
          <Image
            priority
            src="/logo.svg"
            width={80}
            height={80}
            alt="Логотип"
          />
        </Link>
        <Navbar isNotFooter={false} />
      </div>
      <div className="text-center mt-4">
        <p>© Dev Hub Academy | Все права защищены</p>
        <p>2024</p>
      </div>
    </footer>
  );
};

export default Footer;
