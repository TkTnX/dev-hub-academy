import Link from "next/link";
import React from "react";

const TestFinally: React.FC<{ errorsCount: number }> = ({ errorsCount }) => {
  return (
    <div className="py-4">
      <p className="font-bold text-2xl">
        Поздравляем, вы прошли тестирование! 🎊
      </p>
      <p className="font-bold text-xl my-6">
        Всего <span className="text-red-500">ошибок</span>: {errorsCount} шт.
      </p>
      <Link
        className="block text-center mt-4 border rounded py-3 border-green-600 hover:bg-green-600 hover:text-white transition duration-150"
        href="/tests"
      >
        Вернуться к остальным тестам
      </Link>
    </div>
  );
};

export default TestFinally;
