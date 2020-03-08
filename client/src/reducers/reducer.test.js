import reducer from "./questionsReducer";
import * as types from "../actions/types";

describe("Quiz reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      questions: [],
      isFetching: false,
      error: null,
      currentQuestion: 0,
      currentAnswer: "",
      answers: [],
      showResults: false
    });
  });

  it("should handle GET_QUESTIONS", () => {
    expect(
      reducer([], {
        type: types.GET_QUESTIONS,
        payload: { name: "test" }
      })
    ).toEqual({
      isFetching: false,
      questions: { name: "test" }
    });

    //     expect(
    //       reducer(
    //         [
    //           {
    //             text: "Use Redux",
    //             completed: false,
    //             id: 0
    //           }
    //         ],
    //         {
    //           type: types.ADD_TODO,
    //           text: "Run the tests"
    //         }
    //       )
    //     ).toEqual([
    //       {
    //         text: "Run the tests",
    //         completed: false,
    //         id: 1
    //       },
    //       {
    //         text: "Use Redux",
    //         completed: false,
    //         id: 0
    //       }
    //     ]);
  });
});
