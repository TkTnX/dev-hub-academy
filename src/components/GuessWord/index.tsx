"use client";
import React, { useEffect, useRef, useState } from "react";
import { initialWords } from "./words.data";
import { Skeleton, Snackbar } from "@mui/material";

const GuessWord: React.FC = () => {
  const [words, setWords] = useState([...initialWords]);
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const [helperText, setHelperText] = useState("");
  const inpRef = useRef(null);
  const scrambleWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord.name);
    setCategory(newWord.category);

    const shuffleWord = (word: string) => {
      inpRef.current.focus();

      const array = word.split("");
      for (let i = array.length - 1; i > 0; i--) {
        const index = Math.floor(Math.random() * (i + 1));
        [array[i], array[index]] = [array[index], array[i]];
      }
      return array.join("");
    };

    setShuffledWord(shuffleWord(newWord.name));
  };

  const checkWord = () => {
    inpRef.current.focus();

    if (inpVal === currentWord) {
      setHelperText("Вы угадали слово!");
      setWords(words.filter((item) => item.name !== currentWord));
      setInpVal("");
      setOpenSnackbar(true);

      if (words.length === 1) {
        setHelperText("Поздравляем! Игра пройдена!");
        setWords([...initialWords]);
        setInpVal("");
        setShuffledWord("");
        setOpenSnackbar(true);
      } else {
        scrambleWord();
      }
    } else if (inpVal === "") {
      setHelperText("Введите ответ");
      setOpenSnackbar(true);
    } else {
      setHelperText("Неверно! Попробуй ещё раз!");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    scrambleWord();
  }, []);

  const handleShowHint = () => {
    setOpenSnackbar(true);
    setHelperText(`Подсказка: ${currentWord}`);
    inpRef.current.focus();
  };

  return (
    <div className="z-10 block mx-auto w-full md:w-1/2 overflow-hidden left-1/2 top-1/3 text-black rounded-lg py-3 px-8 bg-white">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={1000}
        message={helperText}
      />
      <p>Осталось слов: {words.length - 1}</p>
      <h2 className="font-bold text-2xl text-center pt-10">Угадай слово</h2>
      <p>
        {words.length - 1 !== 0 ? (
          !shuffledWord ? (
            <Skeleton width={100} height={30} />
          ) : (
            `Категория: ${category}`
          )
        ) : (
          ""
        )}
      </p>
      {words.length === 1 ? (
        <div className="text-center my-4">
          <h2 className="text-lg">Поздравляем! Вы прошли игру! 🎉</h2>
          <button
            onClick={() => setWords([...initialWords])}
            className="mt-4 border rounded px-4 py-1 hover:bg-violet-700 hover:text-white transition-all duration-150"
          >
            Начать игру заново
          </button>
        </div>
      ) : (
        <>
          <p
            className="mt-5 border text-2xl font-bold max-w-max mx-auto border-violet-700 px-4 py-1 rounded-xl"
            style={{ letterSpacing: "2px" }}
          >
            {words.length === 0 || !shuffledWord ? (
              <Skeleton width={60} height={30} />
            ) : (
              shuffledWord
            )}
          </p>
          <input
            ref={inpRef}
            autoFocus
            value={inpVal}
            onChange={(e) => setInpVal(e.target.value)}
            placeholder="Слово"
            className="px-3 py-3 w-full border rounded border-gray-400 mt-5"
          />
          <div className="flex flex-wrap-reverse  lg:flex-row items-center justify-center gap-6 mt-4 pb-10">
            <button
              onClick={scrambleWord}
              type="button"
              className="border rounded border-blue-400 bg-blue-400 text-white hover:opacity-80 transition duration-150 px-4 py-1"
            >
              Заменить слово
            </button>
            <button
              onClick={handleShowHint}
              className="rounded border border-black px-4 py-1 hover:bg-black hover:text-white transition-all duration-150"
            >
              Показать подсказку
            </button>
          </div>
          <button
            onClick={checkWord}
            type="button"
            className="w-full border rounded border-green-400 hover:bg-green-400 hover:text-white transition duration-150 px-4 py-1"
          >
            Проверить слово
          </button>

          {/* {helperText !== "" && <p>{helperText}</p>} */}
        </>
      )}
    </div>
  );
};

export default GuessWord;
