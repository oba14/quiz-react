import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./questions";
import * as types from "./types";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  it("should create an action to add a todo", () => {
    const error = "Please select an option";
    const expectedAction = {
      type: types.SET_ERROR,
      error
    };
    expect(actions.setError()).toEqual(expectedAction);
  });
});

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_TODOS_SUCCESS when fetching todos has been done", () => {
    fetchMock.getOnce("/todos", {
      body: { todos: ["do something"] },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ["do something"] } }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
