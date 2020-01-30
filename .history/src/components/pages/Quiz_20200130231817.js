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
          <div  className="container">
            {questions && questions.results.length > 0 && questions.results.map((question, index) =>
       
            <div key={index}>
              
                <h4> Question: {question.question}</h4>
              
                 
                
                <label className="answer" onClick={answerStatus}>a:  {question.correct_answer} </label>
            
                <label className="answer" onClick={answerStatus}>b: {question.incorrect_answers[0]} </label>
                    
                <label  className="answer" onClick={answerStatus}>c: {question.incorrect_answers[1]} </label>
        
                <label className="answer" onClick={answerStatus}>d: {question.incorrect_answers[2]} </label>
              </div>
                    
            )}
            </div>
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