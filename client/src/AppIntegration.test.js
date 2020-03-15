import React from "react";
import { Provider } from "react-redux";
import {
  render as rtlRender,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from "@testing-library/react";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

//jest.mock("axios");

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};
afterEach(cleanup);
it("CLICK START QUIZ", async () => {
  //jest.setTimeout(30000);
  const dataDispatched = {
    noOfQuestions: "5",
    selectedCategory: "13",
    selectedDifficulty: "easy"
  };
  // axios.post.mockResolvedValue({
  //   data: [
  //     {
  //       category: "Sports",
  //       type: "multiple",
  //       difficulty: "easy",
  //       question:
  //         "How%20many%20times%20did%20Martina%20Navratilova%20win%20the%20Wimbledon%20Singles%20Championship%3F",
  //       correct_answer: "Nine",
  //       incorrect_answers: [
  //         { 0: "0 incorrect", 1: "1 incorrect", 3: "2 incorrect" }
  //       ]
  //     }
  //   ]
  // });
  const { getByText, queryByText, getByTestId, debug } = render(<App />);

  expect(queryByText(/Submit Data/)).not.toBeInTheDocument();
  debug();
  fireEvent.click(getByText(/Start the Quiz/i));

  expect(
    queryByText(/Select quiz category and difficult level/)
  ).toBeInTheDocument();

  fireEvent.click(getByTestId("form-submit-btn"));
  debug();
  await wait(() => {
    expect(getByTestId("progress-check")).toBeInTheDocument();
    expect(getByText(/Confirm and Continue/i)).toBeInTheDocument();
  });
});
