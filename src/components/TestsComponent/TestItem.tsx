import Link from "next/link";
import React from "react";
import { TestType } from "./testType";
import Image from "next/image";
import { useSelector } from "react-redux";
import { completedSelector } from "@/redux/slices/tests";

const TestItem: React.FC<TestType> = ({ tests, category }) => {
  const completed = useSelector(completedSelector);

  return (
    <>
      {tests.map(({ title, preview, id }) => (
        <div
          className="grid items-center h-full max-w-80 p-4 bg-white rounded hover:shadow-2xl hover:-translate-y-2 transition duration-150 "
          key={id}
        >
          <p className={`${completed ? "bg-green-600" : "bg-red-600"} px-4 py-1 rounded absolute top-4 right-4`}>{completed ? "Пройден" : "Не пройден"}</p>
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
