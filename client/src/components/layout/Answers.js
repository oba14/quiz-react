import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Answer from "./Answer";

function Answers() {
  const { currentAnswer, currentQuestion, questions } = useSelector(
    state => state.questions
  );
  const [answersCombine, setanswersCombine] = useState([]);
  const question = questions[currentQuestion];

  let answersArray = [];
  useEffect(() => {
    answersArray.push({
      key: "a",
      letter: "a",
      answer: decodeURIComponent(question.correct_answer),
      selected: currentAnswer === decodeURIComponent(question.correct_answer)
    });

    question.incorrect_answers.map(element => {
      answersArray.push({
        key: "b",
        letter: "b",
        answer: decodeURIComponent(element),
        selected: currentAnswer === decodeURIComponent(element)
      });
    });

    setanswersCombine(shuffleArray(answersArray));
  }, [question]);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <>
      {answersCombine.length > 0 &&
        answersCombine.map((anw, index) => (
          <Answer
            key={anw.answer}
            letter={anw.letter}
            answer={anw.answer}
            selected={currentAnswer === anw.answer}
          />
        ))}
    </>
  );
}

export default Answers;
