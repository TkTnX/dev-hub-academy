import Link from "next/link";
import React from "react";

const TestLose: React.FC = () => {
  return (
    <div className="pt-10 text-center font-bold">
      <h4>
        К сожалению, тест <span className="text-red-600">провален</span>!
      </h4>
      <Link
        className="border border-black px-4 py-1 mt-4 rounded block hover:bg-black hover:text-white transition-all duration-150"
        href="/tests"
      >
        Вернуться к тестам
      </Link>
    </div>
  );
};

export default TestLose;
