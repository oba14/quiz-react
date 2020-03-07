import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./questions";
import * as types from "./types";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  it("should create an action to display error when no options are selected", () => {
    const error = "Please select an option";
    const expectedAction = {
      type: types.SET_ERROR,
      error
    };
    expect(actions.setError()).toEqual(expectedAction);
  });
});

describe("Testing fetching questions", () => {
  const data = {
    selectedCategory: "21",
    selectedDifficulty: "hard",
    noOfQuestions: "2"
  };
  it("should create an action to indicate loading error", () => {
    const error = "Error Message";
    const expectedAction = {
      type: types.ERROR_FETCHING,
      payload: error
    };
    expect(actions.errorFetching(error)).toEqual(expectedAction);
  });
  it("should create an action to indicate success", () => {
    expect(actions.questions({ name: "thing name" })).toEqual({
      type: types.GET_QUESTIONS,
      payload: { name: "thing name" }
    });
  });
  it("should create an action to indicate loading", () => {
    expect(actions.isfetching()).toEqual({
      type: types.IS_FETCHING
    });
  });
  it("should create CREATE_THING_SUCCESS when creating succeeds", () => {
    fetchMock.postOnce("/api/things/", {
      body: data,
      headers: { "content-type": "application/json" }
    });
    const expectedActions = [
      { type: types.IS_FETCHING },
      { type: types.GET_QUESTIONS, payload: [] }
    ];

    const store = mockStore();
    return store.dispatch(actions.getQuestions(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("should create ERROR_FETCHING when data is not provided", () => {
    fetchMock.postOnce(
      "/api/things/",
      {
        status: 400,
        body: { message: "oops!" }
      },
      { overwriteRoutes: false }
    );
    const expectedActions = [
      { type: types.IS_FETCHING },
      {
        type: types.ERROR_FETCHING,
        payload: new Error("Bad Request")
      }
    ];
    const store = mockStore();
    return store
      .dispatch(actions.getQuestions({ name: "thing name" }))
      .catch(err => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
