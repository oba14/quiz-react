import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import QuizForm from "./QuizForm";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { getQuestions } from "../../../actions/questions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  questions: [],
  isFetching: false,
  error: null,
  currentQuestion: 0,
  currentAnswer: "",
  answers: [],
  showResults: false
};

describe("Quiz Form", () => {
  //Tests will go here using `it` blocks
  let store;
  afterEach(cleanup);

  beforeEach(() => {
    store = mockStore({ questions: initialState });
    store.dispatch = jest.fn();
  });

  it("Check Categories in quiz form", () => {
    const { getByTestId, debug } = render(
      <Provider store={store}>
        <QuizForm />{" "}
      </Provider>
    );
    debug();
    const categoryQuiz = getByTestId("category-test-quiz-form");
    expect(categoryQuiz).toBeInTheDocument();
  });

  it("Submit the form", async () => {
    const { getByTestId, debug } = render(
      <Provider store={store}>
        <QuizForm />{" "}
      </Provider>
    );
    const quizCategory = await waitForElement(() =>
      getByTestId("category-test-quiz-form")
    );
    debug();
    fireEvent.change(getByTestId("no-of-questions"), {
      target: { value: "4" }
    });
    fireEvent.click(getByTestId("form-submit-btn"));
    expect(getByTestId("no-of-questions").value).toBe("4");
    expect(getByTestId("form-submit-btn")).toBeInTheDocument();
    //expect(store.dispatch).toHaveBeenLastCalledWith(getQuestions());
    // expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  // it("adds a new to-do", () => {
  //   const { getByTestId, getByText } = render(<Todo />);
  //   const input = getByTestId("input");
  //   const todos = getByTestId("todos");
  //   input.value = "Fix failing tests";
  //   fireEvent.click(getByText("Add Task"));
  //   expect(todos.children.length).toBe(3);
  // });
  // it("deletes a to-do", () => {
  //   const { getAllByTestId, getByTestId } = render(<Todo />);
  //   const todos = getByTestId("todos");
  //   const deleteButton = getAllByTestId("delete-button");
  //   const first = deleteButton[0];
  //   fireEvent.click(first);
  //   expect(todos.children.length).toBe(1);
  // });
});
