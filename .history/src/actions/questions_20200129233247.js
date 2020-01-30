import axios from 'axios';
const url = "https://opentdb.com/api.php?amount=10&category=11&difficulty=hard&type=multiple"

// Fetch ALL FORMS from mongodb and display item when component is rendered
export const getQuestions = () => {
    return async (dispatch) => {
        dispatch({
            type: 'IS_FETCHING'
        })
        
        await axios(`${url}`)
          .then(res => {
            dispatch({
                type: 'GET_QUESTIONS',
                payload: res.data,
            })
            }) 
          .catch(error => { 
            console.log("Can’t access " + url + " response. Blocked by browser?")
            dispatch({
                type: 'ERROR_FETCHING',
                payload: error.message
            })
        })
    }
}
