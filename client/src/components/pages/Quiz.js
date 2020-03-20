import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setError,
  setAnswers,
  setCurrentAnswer,
  setCurrentQuestion,
  setShowResults,
  quitQuiz,
  resetQuiz
} from "../../actions/questions";
import Progress from "../layout/Progress";
import Question from "../layout/Question";
import Answers from "../layout/Answers";
import "./quiz.css";

const Quiz = props => {
  // const [answerColor, setAnswerColor] = useState("");

  const {
    questions,
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    error
  } = useSelector(state => state.questions);
  const dispatch = useDispatch();

  let question = {};

  useEffect(() => {
    if (questions.length === 0) {
      props.history.push("/");
    }
  }, [questions]);

  const renderError = () => {
    if (!error) {
      return;
    }

    return (
      <div data-testid="error-select-ans" className="error">
        {error}
      </div>
    );
  };

  const renderResultMark = (question, answer) => {
    if (
      decodeURIComponent(question.correct_answer) ===
      decodeURIComponent(answer.answer)
    ) {
      return <span className="correct">Correct</span>;
    }

    return <span className="failed">Wrong</span>;
  };

  const renderResultsData = () => {
    return answers.map((answer, index) => {
      const question = questions.find(
        question => decodeURIComponent(question.question) === answer.questionId
      );
      return (
        <div key={question.question}>
          {index + 1} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    dispatch(resetQuiz());
  };

  const quit = () => {
    dispatch(quitQuiz());
  };

  const next = () => {
    const answer = {
      questionId: decodeURIComponent(question.question),
      answer: currentAnswer
    };

    if (!currentAnswer) {
      dispatch(setError());
      return;
    }

    answers.push(answer);
    dispatch(setAnswers(answers));
    dispatch(setCurrentAnswer(""));

    if (currentQuestion + 1 < questions.length) {
      dispatch(setCurrentQuestion(currentQuestion));
      return;
    }

    dispatch(setShowResults());
  };

  if (questions.length > 0) {
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
        <button className="btn btn-primary" onClick={quit}>
          Quit
        </button>
      </div>
    );
  } else {
    return (
      <>
        {questions && questions.length > 0 && (
          <div className="container">
            <Progress total={questions.length} current={currentQuestion + 1} />
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
};

export default Quiz;
