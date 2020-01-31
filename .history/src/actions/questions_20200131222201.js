import axios from 'axios';
import {GET_QUESTIONS, 
    ERROR_FETCHING, 
    IS_FETCHING, 
    SET_ERROR, 
    SET_ANSWERS, 
    SET_CURRENT_ANSWER,
    SET_CURRENT_QUESTION,
    SET_SHOW_RESULTS
} from './types'

//const url = "https://opentdb.com/api.php?amount=10&category=11&difficulty=hard&type=multiple&encode=url3986"

// Fetch ALL FORMS from mongodb and display item when component is rendered
export const getQuestions = (data) => {
    return async (dispatch) => {
        dispatch({
            type: IS_FETCHING
        })
        
        await axios(`https://opentdb.com/api.php?amount=${data.noOfQuestions}&category=${data.selectedCategory}&difficulty=${data.selectedDifficulty}&type=multiple&encode=url3986`)
          .then(res => {
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data.results,
            })
            }) 
          .catch(error => { 
            console.log("Can’t access " + url + " response. Blocked by browser?")
            dispatch({
                type: ERROR_FETCHING,
                payload: error.message
            })
        })
    }
}

export const setError = () => dispatch => {
    dispatch({type: SET_ERROR,
        error: 'Please select an option'
    });
}

export const setAnswers = (answers) => dispatch => {
    dispatch({
        type: SET_ANSWERS, 
        answers
    })
}

export const setCurrentAnswer = (e) => dispatch => {
    dispatch({
        type: SET_CURRENT_ANSWER, 
        currentAnswer: e
    })
}

export const setCurrentQuestion = (currentQuestion) => dispatch => {
    dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
    })
}

export const setShowResults = () => dispatch => {
    dispatch({
        type: SET_SHOW_RESULTS, 
        showResults: true
    })
}