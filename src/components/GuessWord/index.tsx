"use client";
import React, { useEffect, useState } from "react";
import { initialWords } from "./words.data";

const GuessWord: React.FC = () => {
  const [words, setWords] = useState([...initialWords]);
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [inpVal, setInpVal] = useState("");
  const [helperText, setHelperText] = useState("");

  const scrambleWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord);

    const shuffleWord = (word: string) => {
      const array = word.split("");
      for (let i = array.length - 1; i > 0; i--) {
        const index = Math.floor(Math.random() * (i + 1));
        [array[i], array[index]] = [array[index], array[i]];
      }
      return array.join("");
    };

    setShuffledWord(shuffleWord(newWord));
  };

  const checkWord = () => {
    if (inpVal === currentWord) {
      setHelperText("Вы угадали слово!");
      setWords(words.filter((item) => item !== currentWord));
      setInpVal("");

      if (words.length === 1) {
        setHelperText("Поздравляем! Игра пройдена!");
        setWords([...initialWords]);
        setInpVal("");
        setShuffledWord("");
        setTimeout(() => {
          scrambleWord();
        }, 3000);
      } else {
        scrambleWord();
      }
    } else {
      setHelperText("Неверно! Попробуй ещё раз!");
    }
  };

  const handleNewWord = () => {
    scrambleWord();
  };

  const handleCheckWord = () => {
    checkWord();
  };

  useEffect(() => {
    scrambleWord();
  }, []);

  return (
    <div className="z-10 block mx-auto w-full md:w-1/3 overflow-hidden left-1/2 top-1/3 text-black rounded-lg py-3 px-8 bg-white">
      <h2 className="font-bold text-2xl text-center pt-10">Угадай слово</h2>
      <p
        className="mt-5 border text-2xl font-bold max-w-max mx-auto border-violet-700 px-4 py-1 rounded-xl"
        style={{ letterSpacing: "2px" }}
      >
        {shuffledWord}
      </p>
      <input
        value={inpVal}
        onChange={(e) => setInpVal(e.target.value)}
        placeholder="Слово"
        className="px-3 py-3 w-full border rounded border-gray-400 mt-5"
      />
      <div className="flex flex-wrap flex-col-reverse lg:flex-row items-center justify-center gap-6 mt-4 pb-10">
        <button
          onClick={handleNewWord}
          type="button"
          className="border rounded border-blue-400 bg-blue-400 text-white hover:opacity-80 transition duration-150 px-4 py-1"
        >
          Заменить слово
        </button>
        <button
          onClick={handleCheckWord}
          type="button"
          className="border rounded border-green-400 hover:bg-green-400 hover:text-white transition duration-150 px-4 py-1"
        >
          Проверить слово
        </button>
      </div>
      {helperText !== "" && <p>{helperText}</p>}
    </div>
  );
};

export default GuessWord;
