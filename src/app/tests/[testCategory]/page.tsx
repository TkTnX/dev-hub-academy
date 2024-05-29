"use client";
import TestItem from "@/components/TestsComponent/TestItem";
import { fetchTests, statusSelector, testsSelector } from "@/redux/slices/tests";
import { AppDispatch } from "@/redux/store";
import { Skeleton } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TestsCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const { testCategory } = useParams();
    const testsList = useSelector(testsSelector);
    const status = useSelector(statusSelector);
  useEffect(() => {
    dispatch(fetchTests(testCategory as string));
  }, []);

  return (
    <ul className="grid mt-14 container mb-10 grid-cols-2 md:grid-cols-3 justify-between gap-2 md:gap-10">
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
  );
};

export default TestsCategory;
