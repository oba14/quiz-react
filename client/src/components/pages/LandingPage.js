import React from "react";
import { NavLink } from "react-router-dom";
import "./forms.css";

const LandingPage = () => {
  return (
    <div className="Landing">
      <h1>WELCOME </h1>
      <h3>Quiz App made with React and Redux</h3>
      <button data-testid="start-quiz-btn" className="btn">
        <NavLink to="/quizform">Start the Quiz</NavLink>{" "}
      </button>
    </div>
  );
};
export default LandingPage;
