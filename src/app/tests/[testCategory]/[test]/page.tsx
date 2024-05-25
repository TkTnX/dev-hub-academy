"use client";
import instance from "@/axios";
import { questionInterface } from "@/components/TestsComponent/testType";
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const TestPage = () => {
  const [dataTest, setDataTest] = useState<questionInterface[]>([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { testCategory, test } = useParams();
  useEffect(() => {
    instance
      .get(`/tests?category=${testCategory}&tests.id=${test}`)
      .then(({ data }) => {
        setDataTest(data[0].tests[0].questions);
      });
  }, []);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (value === dataTest[currentQuestion].correct) {
      setOpenSnackbar(true);
      setCurrentQuestion(currentQuestion + 1);
      setError(false);
    } else {
      setHelperText("Неверно! Попробуй ещё раз!");
      setError(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          Так держать!
        </Alert>
      </Snackbar>
      <div className=" absolute overflow-hidden left-1/2 top-1/2 text-black rounded-lg -translate-x-1/2 -translate-y-1/2 py-3 px-8   bg-white">
        <div
          className="h-1 bg-green-600 absolute top-0 left-0 transition duration-300"
          style={{ width: `${currentQuestion * 10}%` }}
        ></div>
        {currentQuestion === dataTest.length ? (
          <div className="py-4">
            <p className="font-bold text-2xl">
              Поздравляем, вы прошли тестирование! 🎊
            </p>
            <Link
              className="block text-center mt-4 border rounded py-3 border-green-600 hover:bg-green-600 hover:text-white transition duration-150"
              href="/tests"
            >
              Вернуться к остальным тестам
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <p>
                {currentQuestion + 1}&nbsp;/&nbsp;
                <span className="font-bold">{dataTest.length}</span>
              </p>
              <h5 className="text-bold text-2xl text-center mb-8">
                {dataTest.length > 0 && dataTest[currentQuestion].question}
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <FormControl error={error}>
                <FormLabel>Варианты ответов</FormLabel>
                <RadioGroup onChange={handleValueChange}>
                  {dataTest.length > 0 &&
                    dataTest[currentQuestion].variants.map((variant, index) => (
                      <FormControlLabel
                        value={variant}
                        control={<Radio />}
                        key={index}
                        label={variant}
                      />
                    ))}
                </RadioGroup>
                <FormHelperText>{error && helperText}</FormHelperText>
                <button
                  type="submit"
                  className="mt-4 border border-black rounded-xl py-3 hover:bg-black hover:text-white transition duration-150"
                >
                  Проверить ответ
                </button>
              </FormControl>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default TestPage;
