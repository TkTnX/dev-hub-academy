"use client";
import React, { useEffect } from "react";
import TestCategories from "./TestCategories";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests, testsSelector } from "@/redux/slices/tests";
import { AppDispatch } from "@/redux/store";
import TestItem from "./TestItem";

const Tests: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const testsList = useSelector(testsSelector);
  useEffect(() => {
    dispatch(fetchTests());
  }, []);

  return (
    <div className="my-24">
      <h2 className="title-2 container">Тесты</h2>
      <TestCategories />
      <ul className="flex items-center justify-between flex-wrap gap-10">
        {testsList.map((category, index) => (
          <li key={index}>
            <TestItem {...category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tests;
