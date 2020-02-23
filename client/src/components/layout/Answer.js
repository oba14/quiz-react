import React from "react";
import { useDispatch } from "react-redux";
import { SET_CURRENT_ANSWER, SET_ERROR } from "../../actions/types";

function Answer(props) {
  const classes = ["answer"];
  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch({
      type: SET_CURRENT_ANSWER,
      currentAnswer: props.answer
    });
    dispatch({
      type: SET_ERROR,
      error: ""
    });
  };

  if (props.selected) {
    classes.push("selected");
  }
  return (
    <button className={classes.join(" ")} onClick={handleClick}>
      {props.answer}
    </button>
  );
}

export default Answer;
