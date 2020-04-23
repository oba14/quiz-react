import axios from "axios";
import {
  GET_QUESTIONS,
  ERROR_FETCHING,
  IS_FETCHING,
  SET_ERROR,
  SET_ANSWERS,
  SET_CURRENT_ANSWER,
  SET_CURRENT_QUESTION,
  SET_SHOW_RESULTS,
  QUIT,
  RESET_QUIZ,
  SET_USER_NAME
} from "./types";

const url = "http://localhost:5000/quiz";

export const questions = data => {
  return {
    type: GET_QUESTIONS,
    payload: data
  };
};

export const userName = data => {
  return {
    type: SET_USER_NAME,
    payload: data
  }
}
export const isfetching = () => {
  return {
    type: IS_FETCHING
  };
};

export const errorFetching = err => {
  return {
    type: ERROR_FETCHING,
    payload: err
  };
};

export const getQuestions = data => {
  console.log("GET QUESTION ACTION BEING CALLED", data);

  return async dispatch => {
    dispatch(isfetching());
    try {
      return await axios({
        method: "post",
        url: url,
        data: {
          noOfQuestions: data.noOfQuestions,
          selectedCategory: data.selectedCategory,
          selectedDifficulty: data.selectedDifficulty
        }
      })
        .then(res => {
          console.log("INSIDE THENNNNN", res);
          dispatch(questions(res.data.results));
        })
        .catch(error => {
          console.log("Can’t access " + url + " response. Blocked by browser?");
          dispatch(errorFetching(error.message));
        });
    } catch (error) {
      dispatch(errorFetching(`catch block error: ${error.message}`));
    }
  };
};

// export const setError = () => dispatch => {
//   dispatch({ type: SET_ERROR, error: 'Please select an option' });
// };

export const setError = () => {
  return { type: SET_ERROR, error: "Please select an option" };
};

export const setAnswers = answers => dispatch => {
  dispatch({
    type: SET_ANSWERS,
    answers
  });
};

export const setCurrentAnswer = e => dispatch => {
  dispatch({
    type: SET_CURRENT_ANSWER,
    currentAnswer: e
  });
};

export const setCurrentQuestion = currentQuestion => dispatch => {
  dispatch({
    type: SET_CURRENT_QUESTION,
    currentQuestion: currentQuestion + 1
  });
};

export const setShowResults = () => dispatch => {
  dispatch({
    type: SET_SHOW_RESULTS,
    showResults: true
  });
};

export const quitQuiz = () => dispatch => {
  dispatch({
    type: QUIT
  });
};

export const resetQuiz = () => dispatch => {
  dispatch({
    type: RESET_QUIZ
  });
};
