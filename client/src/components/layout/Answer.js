import React from "react";
import { useDispatch } from "react-redux";
import { SET_CURRENT_ANSWER, SET_ERROR } from "../../actions/types";

function Answer({ answer, selected, index }) {
  const classes = ["answer"];
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: SET_CURRENT_ANSWER,
      currentAnswer: answer
    });
    dispatch({
      type: SET_ERROR,
      error: ""
    });
  };

  if (selected) {
    classes.push("selected");
  }
  return (
    <button
      data-testid={`answer-btn-testid-${index}`}
      className={classes.join(" ")}
      onClick={handleClick}
    >
      {answer}
    </button>
  );
}

export default Answer;
