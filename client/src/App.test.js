import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { withRouter } from "react-router";
import { Link, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

test("renders Quiz App made with React and Redux", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Quiz App made with React and Redux/i);
  expect(linkElement).toBeInTheDocument();
});

test("Quiz button", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("start-quiz-btn")).toBeInTheDocument();
  expect(getByTestId("start-quiz-btn")).not.toBeDisabled();
});

// describe("<App />", () => {
//   it("renders", () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.exists(".Landing")).toEqual(true);
//   });
// });

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

test("full app rendering/navigating", () => {
  afterEach(cleanup);
  const { container } = renderWithRouter(<App />);
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch("Quiz App made with React");

  const leftClick = { button: 0 };
  fireEvent.click(screen.getByText(/about/i), leftClick);
  expect(container.innerHTML).toMatch(
    "A quiz app made using react. Questions are generated using a free api hosted at https://opentdb.com/"
  );

  fireEvent.click(screen.getByText(/contact/i), leftClick);
  expect(container.innerHTML).toMatch("tech.startup.114@gmail.com");
});

test("landing on a bad page", () => {
  const { container } = renderWithRouter(<App />, {
    route: "/errorpage"
  });
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch("Page Not Found");
});

// test("rendering a component that uses withRouter", () => {
//   const route = "/some-route";
//   renderWithRouter(<LocationDisplay />, { route });
//   expect(screen.getByTestId("location-display").textContent).toBe(route);
// });
