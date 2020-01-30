import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { getQuestions } from "../../actions/questions";
import './quiz.css';

const Quiz = () => {

    console.log('this is dashboard');
    
    const [answerColor, setAnswerColor] = useState('');
    const {questions, currentQuestion, currentAnswer, answers, showResults, error} = useSelector(state => state.questions)
    
    const question = questions[currentQuestion];
    
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

    const renderError = () => {
      if (!error) {
          return;
      }

      return <div className="error">{error}</div>;
    };

    const renderResultMark = (question, answer) => {
      if (question.correct_answer === answer.answer) {
          return <span className="correct">Correct</span>;
      }

      return <span className="failed">Failed</span>;
    };

    const renderResultsData = () => {
      return answers.map(answer => {
          const question = questions.find(
              question => question.id === answer.questionId
          );

          return (
              <div key={question.id}>
                  {question.question} - {renderResultMark(question, answer)}
              </div>
          );
      });
    };

    const restart = () => {
      dispatch({type: 'RESET_QUIZ'});
    };

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
            {questions && questions.length > 0 && questions.map((question, index) =>
       
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