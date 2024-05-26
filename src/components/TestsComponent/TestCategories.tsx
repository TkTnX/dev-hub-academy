import React from "react";
import { testCategories } from "./testsCategories.data";

const TestCategories: React.FC<{
  activeCategory: number;
  setActiveCategory: (n: number) => void;
}> = ({ activeCategory, setActiveCategory }) => {
  return (
    <ul className="flex items-center gap-5 mt-6 flex-wrap">
      {testCategories.map((category, index) => (
        <li key={index}>
          <button
            onClick={() => setActiveCategory(index)}
            className={`border px-4 py-1 rounded hover:bg-white hover:text-black transition duration-150 ${
              activeCategory === index && "bg-white text-black"
            }`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TestCategories;
