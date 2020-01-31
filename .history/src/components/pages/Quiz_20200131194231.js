import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { getQuestions, setError, setAnswers, setCurrentAnswer, setCurrentQuestion, setShowResults } from "../../actions/questions";
import Progress from '../layout/Progress';
import Question from '../layout/Question';
import Answers from '../layout/Answers';
import './quiz.css';

const Quiz = () => {

    console.log('this is dashboard');
    
    const [answerColor, setAnswerColor] = useState('');
    const {questions, currentQuestion, currentAnswer, answers, showResults, error} = useSelector(state => state.questions)
    const dispatch = useDispatch()
    
    let question = {};
    
    
    // console.log('QUIZ QUESTIONS', questions);
    
  

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
      // console.log('RENDER RESULT QUESTION', question);
      // console.log('RENDER RESULT Answer', answer);
      
      if (decodeURIComponent(question.correct_answer) === decodeURIComponent(answer.answer)) {
          return <span className="correct">Correct</span>;
      }

      return <span className="failed">Failed</span>;
    };

    const renderResultsData = () => {
      return answers.map(answer => {
          const question = questions.find(
              question => decodeURIComponent(question.question) === answer.questionId
          );

          return (
              <div key={question.question}>
                  {decodeURIComponent(question.question)} - {renderResultMark(question, answer)}
              </div>
          );
      });
    };

    const restart = () => {
      dispatch({type: 'RESET_QUIZ'});
    };

    const next = () => {
      const answer = {questionId: decodeURIComponent(question.question), answer: currentAnswer};

      if (!currentAnswer) {
          dispatch(setError());
          return;
      }

      answers.push(answer);
      dispatch(setAnswers(answers));
      dispatch(setCurrentAnswer(''));

      if (currentQuestion + 1 < questions.length) {
          dispatch(setCurrentQuestion(currentQuestion));
          return;
      }

      dispatch(setShowResults());
    };

    const answerStatus = (e) => {
      if(e.target.value === questions.correct_answer){
        setAnswerColor('green')
      } else{
        setAnswerColor('red')
      }
    }

    if(questions.length > 0) {
      question = questions[currentQuestion];
    }
  
    if (showResults) {
      return (
          <div className="container results">
              <h2>Results</h2>
              <ul>{renderResultsData()}</ul>
              <button className="btn btn-primary" onClick={restart}>
                  Restart
              </button>
          </div>
      );
    } else {
      return (
        <>
          {questions && questions.length > 0  && (
            <div  className="container">
              <Progress
                total={questions.length}
                current={currentQuestion + 1}
              />  
              <Question />
              {renderError()}
              <Answers />
              <button className="btn btn-primary" onClick={next}>
                  Confirm and Continue
              </button>         
            </div>
          )}
        </>
      );
    }
  }
  
  export default Quiz
  

  // <div >
              
  //               <h4> Question: {question.question}</h4>
              
                 
                
  //               <label className="answer" onClick={answerStatus}>a:  {question.correct_answer} </label>
            
  //               <label className="answer" onClick={answerStatus}>b: {question.incorrect_answers[0]} </label>
                    
  //               <label  className="answer" onClick={answerStatus}>c: {question.incorrect_answers[1]} </label>
        
  //               <label className="answer" onClick={answerStatus}>d: {question.incorrect_answers[2]} </label>
  //             </div>  
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