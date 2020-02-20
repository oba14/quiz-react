import React from "react";
import { useSelector } from "react-redux";
import Answer from "./Answer";

function Answers() {
  const { currentAnswer, currentQuestion, questions } = useSelector(
    state => state.questions
  );
  const question = questions[currentQuestion];

  return (
    <>
      <Answer
        letter="a"
        answer={decodeURIComponent(question.correct_answer)}
        selected={currentAnswer === "a"}
      />
      <Answer
        letter="b"
        answer={decodeURIComponent(question.incorrect_answers[0])}
        selected={currentAnswer === "b"}
      />
      <Answer
        letter="c"
        answer={decodeURIComponent(question.incorrect_answers[1])}
        selected={currentAnswer === "c"}
      />
      <Answer
        letter="d"
        answer={decodeURIComponent(question.incorrect_answers[2])}
        selected={currentAnswer === "d"}
      />
    </>
  );
}

export default Answers;
