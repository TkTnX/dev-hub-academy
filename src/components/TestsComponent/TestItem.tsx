import Link from "next/link";
import React from "react";
import { TestType } from "./testType";
import Image from "next/image";

const TestItem: React.FC<TestType> = ({ tests, category }) => {
  return (
    <>
      {tests.map(({ title, preview, id }) => (
        <div
          className="grid items-center h-full max-w-80 p-4 bg-white rounded hover:shadow-2xl hover:-translate-y-2 transition duration-150 "
          key={id}
        >
          <Link href={`/tests/${category}/${id}`}>
            <Image
              priority
              src={preview}
              width={100}
              height={100}
              className="w-full h-full"
              alt={title}
            />
          </Link>
          <h4 className="text-black mt-4 font-bold">{title}</h4>
          <Link
            href={`/tests/${category}/${id}`}
            className="text-black border rounded w-full block text-center border-gray-900 mt-5 hover:bg-black hover:text-white transition duration-150"
          >
            Начать тест
          </Link>
        </div>
      ))}
    </>
  );
};

export default TestItem;
