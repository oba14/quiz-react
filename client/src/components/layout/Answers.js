import React from "react";
import { useSelector } from "react-redux";
import Answer from "./Answer";
import { Flipper, Flipped } from "react-flip-toolkit";

function Answers() {
  const { currentAnswer, currentQuestion, questions } = useSelector(
    state => state.questions
  );
  const question = questions[currentQuestion];

  const shuffleAnswers = () => {
    const answerDiv = document.querySelector(".answer-div");
    if (answerDiv) {
      const children = answerDiv.children;
      console.log("Children", children.item);
      while (children.length) {
        answerDiv.append(
          children.item(Math.floor(Math.random() * children.length), 1)
        );
      }
    }
  };

  // if (answerDiv.children()) {
  //   console.log("answer DIV", answerDiv.children());
  // }

  return (
    <div className="answer-div">
      <Flipper flipKey={1}>
        <Flipped key="a" flipId="a">
          <Answer
            key="a"
            letter="a"
            answer={decodeURIComponent(question.correct_answer)}
            selected={
              currentAnswer === decodeURIComponent(question.correct_answer)
            }
          />
        </Flipped>
        <Flipped key="b" flipId="b">
          <Answer
            key="b"
            letter="b"
            answer={decodeURIComponent(question.incorrect_answers[0])}
            selected={
              currentAnswer ===
              decodeURIComponent(question.incorrect_answers[0])
            }
          />
        </Flipped>
        <Flipped key="c" flipId="c">
          <Answer
            key="c"
            letter="c"
            answer={decodeURIComponent(question.incorrect_answers[1])}
            selected={
              currentAnswer ===
              decodeURIComponent(question.incorrect_answers[1])
            }
          />
        </Flipped>
        <Flipped key="d" flipId="d">
          <Answer
            key="d"
            letter="d"
            answer={decodeURIComponent(question.incorrect_answers[2])}
            selected={
              currentAnswer ===
              decodeURIComponent(question.incorrect_answers[2])
            }
          />
        </Flipped>
      </Flipper>
    </div>
  );
}

export default Answers;
