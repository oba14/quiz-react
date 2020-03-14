import React from "react";
import { Provider } from "react-redux";
import { render as rtlRender, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios");

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};

it("CLICK START QUIZ", async () => {
  const dataDispatched = {
    noOfQuestions: "5",
    selectedCategory: "13",
    selectedDifficulty: "easy"
  };
  axios.post.mockResolvedValue({ data: dataDispatched });
  const { getByText, queryByText } = render(<App />);

  expect(queryByText(/Submit Data/)).not.toBeInTheDocument();

  fireEvent.click(getByText(/Start the Quiz/i));

  expect(
    queryByText(/Select quiz category and difficult level/)
  ).toBeInTheDocument();

  fireEvent.click(getByText(/Submit Data/i));
  await wait(() => {
    expect(queryByText(/Confirm and Continue/i)).toBeInTheDocument();
    //expect(queryByText(/Save that fact/)).toBeInTheDocument();
  });
});
