"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const pathname = usePathname();
  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl sm:text-3xl md:text-7xl font-bold">404!</h2>
      <p>
        Страница по запросу{" "}
        <span className="font-bold underline">{pathname}</span> не найдена!
      </p>
      <Link
        href="/"
        className="border block max-w-max mx-auto mt-9 px-4 py-1 hover:bg-white hover:text-black transition duration-150 rounded"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
