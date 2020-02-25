import React from 'react';
import { useSelector } from 'react-redux';
import './Question.css';

function Question() {
  const { currentQuestion, questions } = useSelector(state => state.questions);
  const question = questions[currentQuestion];
  return <h2>{decodeURIComponent(question.question)}</h2>;
}

export default Question;
