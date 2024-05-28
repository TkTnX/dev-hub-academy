"use client";
import instance from "@/axios";
import TestFinally from "@/components/TestsComponent/TestFinally";
import TestLose from "@/components/TestsComponent/TestLose";
import { questionInterface } from "@/components/TestsComponent/testType";
import { completedTestsSelector, setCompleted } from "@/redux/slices/tests";
import { getCompletedTestLS } from "@/utils/saveCompletedTests";
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { Heart, Undo2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TestPage = () => {
  const [dataTest, setDataTest] = useState<questionInterface[]>([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [errorsCount, setErrorsCount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const { testCategory, test } = useParams();
  const router = useRouter();
  const completedTests = useSelector(completedTestsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    instance
      .get(`/tests?category=${testCategory}&tests.id=${test}`)
      .then(({ data }) => {
        setDataTest(data[0].tests[0].questions);
      })
      .catch((error) => {
        alert("Не удалось получить данные!");
        console.log(error);
        router.push("/");
      })
      .finally(() => setLoading(false));
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
      setHelperText("Неверно! Вы потеряли одну жизнь :(");
      setError(true);
      setErrorsCount(errorsCount + 1);
      setLifes(lifes - 1);
    }
  };

  if (
    currentQuestion === dataTest.length &&
    !isLoading &&
    dataTest.length !== 0
  ) {
    dispatch(setCompleted(+test));
  }

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
      <div className="relative mb-4 block mx-auto w-full md:w-1/2 overflow-hidden text-black rounded-lg py-3 px-8 bg-white">
        {currentQuestion !== dataTest.length && (
          <Link href="/tests" className="absolute right-4 md:left-4 top-3">
            <Undo2 />
          </Link>
        )}
        <div
          className={`h-1 bg-green-600 absolute top-0 left-0 transition duration-300 ${
            lifes === 0 && "bg-red-600"
          }`}
          style={{ width: `${(currentQuestion / dataTest.length) * 100}%` }}
        ></div>
        {currentQuestion === dataTest.length &&
        !isLoading &&
        dataTest.length !== 0 ? (
          <TestFinally errorsCount={errorsCount} />
        ) : lifes === 0 ? (
          <TestLose />
        ) : (
          <>
            <div className="grid  md:flex items-center  justify-between gap-2">
              <p>
                {currentQuestion + 1}&nbsp;/&nbsp;
                <span className="font-bold">{dataTest.length}</span>
              </p>
              <h5 className="text-bold text-base sm:text-2xl text-center mb-8">
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  dataTest.length > 0 && dataTest[currentQuestion].question
                )}
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <FormControl error={error}>
                <FormLabel>Варианты ответов</FormLabel>
                <RadioGroup onChange={handleValueChange}>
                  {isLoading
                    ? [...new Array(4)].map((_, index) => (
                        <Skeleton key={index} height={30} width={230} />
                      ))
                    : dataTest.length > 0 &&
                      dataTest[currentQuestion].variants.map(
                        (variant, index) => (
                          <FormControlLabel
                            value={variant}
                            control={<Radio />}
                            key={index}
                            label={variant}
                          />
                        )
                      )}
                </RadioGroup>
                <FormHelperText>{error && helperText}</FormHelperText>
                <div className="flex gap-2 items-center justify-between">
                  <button
                    type="submit"
                    className="mt-4 grow border border-black rounded-xl py-3 hover:bg-black hover:text-white transition duration-150"
                  >
                    Проверить ответ
                  </button>
                  <div className="flex  items-center gap-2">
                    <Heart color="red" fill="red" />
                    <p className="font-bold text-xl">{lifes}</p>
                  </div>
                </div>
              </FormControl>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default TestPage;
