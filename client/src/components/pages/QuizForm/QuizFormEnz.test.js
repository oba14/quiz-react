import React from "react";
import { render, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import QuizForm from './QuizForm';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { getQuestions } from "../../../actions/questions";

const mockStore = configureStore([]);
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
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("displays initial to-dos", () => {
    const { getByTestId, debug } = render(<Provider store= {store}><QuizForm /> </Provider>);
    debug();
    const categoryQuiz = getByTestId("category-test-quiz-form");
    expect(categoryQuiz).toBeInTheDocument();
  });

  it("displays initial to-dos", async () => {

    const { getByTestId, debug } = render(<Provider store= {store}><QuizForm /> </Provider>);
    const quizCategory = await waitForElement(() => getByTestId("category-test-quiz-form"))
    debug();
    fireEvent.click(getByTestId("form-submit-btn"));
    expect(getByTestId("form-submit-btn")).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenLastCalledWith(getQuestions());
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