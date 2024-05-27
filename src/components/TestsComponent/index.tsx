"use client";
import React, { useEffect, useState } from "react";
import TestCategories from "./TestCategories";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTests,
  statusSelector,
  testsSelector,
} from "@/redux/slices/tests";
import { AppDispatch } from "@/redux/store";
import TestItem from "./TestItem";
import { Skeleton } from "@mui/material";
import { testCategories } from "./testsCategories.data";
const Tests: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const testsList = useSelector(testsSelector);
  const status = useSelector(statusSelector);
  useEffect(() => {
    dispatch(fetchTests(testCategories[activeCategory]));
  }, [activeCategory]);

  return (
    <div className="my-24">
      <h2 className="title-2 container">Тесты</h2>
      <TestCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ul className="grid mt-14 grid-cols-2 md:grid-cols-3 justify-between gap-2 md:gap-10">
        {status === "loading" ? (
          [...new Array(3)].map((_, index) => (
            <Skeleton key={index} sx={{ width: "100%", height: "600px" }} />
          ))
        ) : testsList && testsList.length !== 0 ? (
          testsList.map((category, index) => (
            <li key={index}>
              <TestItem {...category} />
            </li>
          ))
        ) : (
          <p>Не удалось получить данные!</p>
        )}
      </ul>
    </div>
  );
};

export default Tests;
