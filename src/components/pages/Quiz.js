import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { getQuestions } from "../../actions/questions";
import './quiz.css';

const Quiz = () => {

    console.log('this is dashboard');
    
    const [answerColor, setAnswerColor] = useState('');
    const questions = useSelector(state => state.questions.questions)
    console.log('QUIZ QUESTIONS', questions);
    
    const dispatch = useDispatch()
  

    useEffect(() => {
      
      fetchData();
    }, [])

    useEffect(() => {
      
    }, [questions])
   
    const fetchData = () => {
      dispatch(getQuestions())
    }

    const answerStatus = (e) => {
      if(e.target.value === questions.correct_answer){
        setAnswerColor('green')
      } else{
        setAnswerColor('red')
      }
    }
  
      return (
        <>
            {questions && questions.results.length > 0 && questions.results.map((question, index) =>
       
          <div key={index} className="answers">
       
                   <h4> Question: {question.question}</h4>
                    <div className="col-md-3 center-align answers correctanswer" style={{backgroundColor: answerColor, border:'2px solid red'}} >
                        <span >A</span>
                        <label onClick={answerStatus}> {question.correct_answer} </label>
                    </div>
                    <div className="answers" style={{backgroundColor: answerColor}}>
                        <span className="answers">B</span>
                        <label className="b" onClick={answerStatus}> {question.incorrect_answers[0]} </label>
                    </div>
                    <div className="answers" style={{backgroundColor: answerColor}} >
                        <span >C</span>
                        <label onClick={answerStatus}> {question.incorrect_answers[1]} </label>
                    </div>
                    <div className="answers" style={{backgroundColor: answerColor}} >
                        <span >D</span>
                        <label onClick={answerStatus}> {question.incorrect_answers[2]} </label>
                    </div>
          </div>
            )}
            </>
          );
  }
  
  export default Quiz
  