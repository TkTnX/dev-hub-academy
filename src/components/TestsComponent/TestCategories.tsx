"use client";
import React, { useState } from "react";
import { testCategories } from "./testsCategories.data";

const TestCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <ul className="flex items-center gap-5 mt-6">
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
