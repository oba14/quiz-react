import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

function Question() {
  // const {state} = useContext(QuizContext);
  const { currentQuestion, questions } = useSelector(state => state.questions);

  const question = questions[currentQuestion];
  return <h1>{decodeURIComponent(question.question)}</h1>;
}

export default Question;
