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

  // When app loads Submit data button shouldnt be displayed
  expect(queryByText(/Submit Data/)).not.toBeInTheDocument();

  // Click Start the Quiz Button
  fireEvent.click(getByText(/Start the Quiz/i));
  // Check if quiz form page is loaded
  expect(
    queryByText(/Select quiz category and difficult level/)
  ).toBeInTheDocument();

  // Submit the form by clicking Submit Data button
  fireEvent.click(getByTestId("form-submit-btn"));

  // Wait for the questions to be loaded
  await wait(() => {
    expect(getByTestId("progress-check")).toBeInTheDocument();
    expect(getByText(/Confirm and Continue/i)).toBeInTheDocument();
  });

  // Clicking Confirm and continue button without selecting an answer should give an error
  fireEvent.click(getByText(/Confirm and Continue/i));
  expect(getByText(/Please select an option/i)).toBeInTheDocument();

  // Select an answer
  fireEvent.click(getByTestId("answer-btn-testid-1"));
  // Submit the answer
  fireEvent.click(getByText(/Confirm and Continue/i));
  // Expect the result page to be shown
  expect(getByText(/Results/i)).toBeInTheDocument();
  debug();

  // Quit the app
  fireEvent.click(getByText(/Quit/i));
  // Expect the app to Go to Home page
  expect(getByText(/WELCOME/i)).toBeInTheDocument();
});
