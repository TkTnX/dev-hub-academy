import Link from "next/link";
import React, { useEffect } from "react";
import { TestType } from "./testType";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { completedTestsSelector, setCompleted } from "@/redux/slices/tests";
import { getCompletedTestLS } from "@/utils/saveCompletedTests";

const TestItem: React.FC<TestType> = ({ tests, category }) => {
  const completedTests = useSelector(completedTestsSelector);
  const dispatch = useDispatch()
  
  useEffect(() => {
    const storedCompletedTests = getCompletedTestLS();
    dispatch(setCompleted(storedCompletedTests));
  }, [dispatch]);

  return (
    <>
      {tests.map(({ title, preview, id }) => {
        const isCompleted = completedTests[id];
        return (
          <div
            className="grid items-center h-full max-w-80 relative p-4 bg-white rounded hover:shadow-2xl hover:-translate-y-2 transition duration-150"
            key={id}
          >
            <p
              className={`${
                isCompleted ? "bg-green-600" : "bg-red-600"
              } px-4 py-1 rounded absolute right-4 top-4`}
            >
              {isCompleted ? "Пройден" : "Не пройден"}
            </p>
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
        );
      })}
    </>
  );
};

export default TestItem;
