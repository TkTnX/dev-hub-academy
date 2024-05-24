import Link from "next/link";
import React from "react";

const LetsStart: React.FC = () => {
  return (
    <section className="container mt-8 mb-20 grid text-center items-center justify-center gap-10">
      <h2 className="title-2 ">Чего ждёшь?</h2>
      <Link
        className="border rounded px-8 py-2 hover:bg-gradient-to-r hover:from-violet-950 hover:to-blue-400  hover:scale-105 active:scale-90 transition duration-150"
        href="/tests"
      >
        Начать тест
      </Link>
    </section>
  );
};

export default LetsStart;
