import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [answerLog, setAnswerLog] = useState(false);
  const [score, setScore] = useState(0);
  const [result, SetResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionArray = [option1, option2, option3, option4];

  const checkAnswer = (element, answer) => {
    if (answerLog === false) {
      if (question.ans === answer) {
        element.target.classList.add("correct");
        setAnswerLog(true);
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add("wrong");
        setAnswerLog(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (answerLog === true) {
      if (index === data.length - 1) {
        SetResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setAnswerLog(false);
      optionArray.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const resetQuestion = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setAnswerLog(false);
    SetResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkAnswer(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkAnswer(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkAnswer(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkAnswer(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={nextQuestion}>Next</button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
      {result ? (
        <>
          {" "}
          <h2>
            Your Scored is {score} out of {data.length}
          </h2>
          <button onClick={resetQuestion}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
