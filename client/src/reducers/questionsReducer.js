import {
  GET_QUESTIONS,
  ERROR_FETCHING,
  IS_FETCHING,
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
  QUIT,
  SET_USER_NAME
} from "../actions/types";

const initialState = {
  questions: [],
  isFetching: false,
  error: null,
  currentQuestion: 0,
  currentAnswer: "",
  answers: [],
  showResults: false,
  user_name: ""
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, isFetching: false, questions: action.payload };
    case IS_FETCHING:
      return { ...state, isFetching: true };
    case ERROR_FETCHING:
      return { ...state, error: action.payload };
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.currentAnswer
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.showResults
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.answers
      };
    case RESET_QUIZ:
      return {
        ...state,
        answers: [],
        currentQuestion: 0,
        currentAnswer: "",
        showResults: false,
        error: ""
      };
    case QUIT:
      return {
        ...state,
        questions: [],
        isFetching: false,
        error: null,
        currentQuestion: 0,
        currentAnswer: "",
        answers: [],
        showResults: false
      };
    case SET_USER_NAME:
      return {
        ...state,
        user_name: action.payload
      }
    default:
      return state;
  }
};

export default questionsReducer;
