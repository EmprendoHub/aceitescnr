"use client";
import React, { useState } from "react";

import "./_onboardingQuiz.scss";
import { addOnboarding } from "@/app/[lang]/_actions";

const OnboardingQuiz = ({ lang, onboardingDic }) => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(onboardingDic.questions[index]);
  const [answers, setAnswers] = useState([
    { idx: 0, answer: { es: "", en: "" } },
  ]);
  const [textInput, setTextInput] = useState("");

  function setAnswer(answer, ans) {
    let prevAnswers = [...answers];
    if (prevAnswers[index]) {
      prevAnswers[index].idx = ans;
      if (lang === "es") {
        prevAnswers[index].answer.es = answer;
      } else {
        prevAnswers[index].answer.en = answer;
      }
    } else {
      let newAnswer;
      if (lang === "es") {
        newAnswer = { idx: ans, answer: { es: answer, en: "" } };
      } else {
        newAnswer = { idx: ans, answer: { es: "", en: answer } };
      }
      prevAnswers = [...prevAnswers, newAnswer]; // Use the spread syntax to include newAnswer
    }
    setAnswers(prevAnswers);
  }

  const changeInput = (text) => {
    setTextInput(text);
    if (text.length > 5) {
      setAnswer(text, 1);
    }
  };

  const clickNext = (newIndex) => {
    setIndex(newIndex);
    setQuestion(onboardingDic.questions[newIndex]);

    setTextInput("");
  };

  const sendAnswers = async () => {
    const data = JSON.stringify(answers);
    const res = await addOnboarding(data);
  };
  return (
    <div className="onboaring flex flex-col w-full h-full items-center justify-center">
      <div className="bg-main-gradient text-white h-auto px-20 py-14 w-[640px] maxmd:px-5 maxmd:w-full maxsm:px-2 rounded-sm">
        <h1 className=" font-primary text-2xl">{onboardingDic.title}</h1>
        <hr className="mb-2" />
        <h2 className="font-secondary text-dark mb-3 text-sm">
          {index + 1}.- {question.question}
        </h2>
        {question?.type === "text" ? (
          <ul className=" font-secondary text-sm">
            <li
              className={
                answers[index] && answers[index].idx === 1 ? "bg-dark" : ""
              }
              onClick={(e) => {
                setAnswer(question.option1, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              className={
                answers[index] && answers[index].idx === 2 ? "bg-dark" : ""
              }
              onClick={(e) => {
                setAnswer(question.option2, 2);
              }}
            >
              {question.option2}
            </li>
            {question.option3 && (
              <li
                className={
                  answers[index] && answers[index].idx === 3 ? "bg-dark" : ""
                }
                onClick={(e) => {
                  setAnswer(question.option3, 3);
                }}
              >
                {question.option3}
              </li>
            )}

            {question.option4 && (
              <li
                className={
                  answers[index] && answers[index].idx === 4 ? "bg-dark" : ""
                }
                onClick={(e) => {
                  setAnswer(question.option4, 4);
                }}
              >
                {question.option4}
              </li>
            )}
            {question.option5 && (
              <li
                className={
                  answers[index] && answers[index].idx === 5 ? "bg-dark" : ""
                }
                onClick={(e) => {
                  setAnswer(question.option5, 5);
                }}
              >
                {question.option5}
              </li>
            )}
            {question.option6 && (
              <li
                className={
                  answers[index] && answers[index].idx === 4 ? "bg-dark" : ""
                }
              >
                <input
                  value={textInput}
                  onChange={(e) => changeInput(e.target.value)}
                  className=" appearance-none bg-transparent focus:outline-none"
                  type="text"
                  placeholder={question.option6}
                />
              </li>
            )}
          </ul>
        ) : (
          question?.type === "input" && (
            <div>
              <input
                value={textInput}
                onChange={(e) => changeInput(e.target.value)}
                className=" appearance-none bg-transparent"
                type="text"
                placeholder={question.placeholder}
              />
            </div>
          )
        )}

        {index + 1 < onboardingDic.questions.length ? (
          <button
            disabled={!answers[index]?.idx}
            onClick={() => clickNext(index + 1)}
            className={`bg-accentTwo px-6 py-1 mt-10 mb-1 rounded-sm ease-in-out duration-300 ${
              !answers[index]?.idx ? "bg-opacity-20" : ""
            }`}
          >
            {onboardingDic.btnText}
          </button>
        ) : (
          answers[index] &&
          answers[index].idx !== 0 &&
          index + 1 === onboardingDic.questions.length && (
            <button
              onClick={() => sendAnswers()}
              className=" bg-accentTwo px-6 py-1 mt-10 mb-1 rounded-sm"
            >
              {onboardingDic.sendButton}
            </button>
          )
        )}

        <div className="index font-secondary text-xs">
          {index + 1} {onboardingDic.footer} {onboardingDic.questions.length}{" "}
          {onboardingDic.footer2}
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuiz;
