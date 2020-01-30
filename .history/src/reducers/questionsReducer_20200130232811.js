const initialState= {
    questions: [],
    isFetching: false,
    error: null
};

const questionsReducer = (state= initialState, action) => {
    switch(action.type) {
        case "GET_QUESTIONS":
            return {...state,
                isFetching: false,
                questions: action.payload
            }
            case "IS_FETCHING":
                return {...state,
                    isFetching: true
                }
            case "ERROR_FETCHING":
                return {...state,
                error: action.payload
            }
            default:
                return state;
    }
}

export default questionsReducer;