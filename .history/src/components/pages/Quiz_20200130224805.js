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
       
          <div key={index} className="Landing">
            <div>
              <h4> Question: {question.question}</h4>
                
              <span >A</span>
              <label onClick={answerStatus}> {question.correct_answer} </label>
          
              <span >B</span>
              <label className="b" onClick={answerStatus}> {question.incorrect_answers[0]} </label>
          
          
              <span >C</span>
              <label onClick={answerStatus}> {question.incorrect_answers[1]} </label>
      
              <span >D</span>
              <label onClick={answerStatus}> {question.incorrect_answers[2]} </label>
            </div>        
          </div>
            )}
            </>
          );
  }
  
  export default Quiz
  
  // <>
  //           {questions && questions.results.length > 0 && questions.results.map((question, index) =>
  //         <div key={index}>
  //           <div className="container" style={{marginTop:'5%'}}>
  //             <div className="row">
  //               <div className="col-md-12 center-align">
  //                 <h4> Question: {question.question}
  //                 </h4>
  //               <span></span>
  //               </div>
  //             </div>
  //           </div>
  //           <div  className="container" style={{marginTop:'5%'}}>
  //               <div className="row">
  //                   <div className="col-md-4 center-align">
  //                       <label> {question.correct_answer} </label>
  //                   </div>
  //                   <div className="col-md-4 center-align">
  //                       <label> {question.incorrect_answers[0]} </label>
  //                   </div>
  //                   <div className="col-md-4 center-align">
  //                       <label> {question.incorrect_answers[1]} </label>
  //                   </div>
  //                   <div className="col-md-4 center-align">
  //                       <label> {question.incorrect_answers[2]} </label>
  //                   </div>
  //               </div>
  //           </div>
  //         </div>
  //           )}
  //           </>