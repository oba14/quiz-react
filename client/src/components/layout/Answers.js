import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Answer from './Answer';

function Answers() {
  const { currentAnswer, currentQuestion, questions } = useSelector(
    state => state.questions
  );
  const [ answersCombine, setanswersCombine ] = useState([]);
  const question = questions[currentQuestion];

  const answersArray = [];
  useEffect(() => {
    answersArray.push({
      answer: decodeURIComponent(question.correct_answer),
      selected: currentAnswer === decodeURIComponent(question.correct_answer)
    });

    question.incorrect_answers.map(element => {
      answersArray.push({
        answer: decodeURIComponent(element),
        selected: currentAnswer === decodeURIComponent(element)
      });
    });

    setanswersCombine(shuffleArray(answersArray));
  }, [ question ]);

  const shuffleArray = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  return (
    <>
      {answersCombine.length > 0 &&
        answersCombine.map(anw => (
          <Answer
            key={ anw.answer }
            answer={ anw.answer }
            selected={ currentAnswer === anw.answer }
          />
        ))}
    </>
  );
}

export default Answers;

// "test": "react-scripts test --transformIgnorePatterns 'node_modules/(?!(<jsdom>)/)'",