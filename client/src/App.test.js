import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { withRouter } from "react-router";
import { Link, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NotFound from "./components/pages/NotFound";

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);
describe("Render Quiz App without crash", () => {
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

describe("Bad REQUEST", () => {
  afterEach(cleanup);
  test("landing on a bad page", () => {
    // const { container } = renderWithRouter(<App />, {
    //   route: "/errorpage"
    // });
    // normally I'd use a data-testid, but just wanted to show this is also possible
    const history = createMemoryHistory();
    history.push("/pagenotfound");
    const { getByRole, container, getByTestId } = render(
      <Router history={history}>
        <NotFound />
      </Router>
    );
    expect(getByTestId("page-not-found")).toHaveTextContent("Page Not Found");
    expect(container.innerHTML).toMatch("Page Not Found");
  });
});

describe("NAVIGATION CHECK", () => {
  afterEach(cleanup);
  test("full app rendering/navigating", () => {
    const { container, getByTestId } = renderWithRouter(<App />);
    // normally I'd use a data-testid, but just wanted to show this is also possible
    expect(container.innerHTML).toMatch("Quiz App made with React");

    const leftClick = { button: 0 };
    fireEvent.click(screen.getByText(/about/i), leftClick);
    expect(container.innerHTML).toMatch(
      "A quiz app made using react. Questions are generated using a free api hosted at https://opentdb.com/"
    );

    fireEvent.click(screen.getByText(/contact/i), leftClick);
    expect(container.innerHTML).toMatch("tech.startup.114@gmail.com");
    expect(getByTestId("test-contact-email")).toBeVisible();

    fireEvent.click(screen.getByText(/home/i), leftClick);
    expect(container.innerHTML).toMatch("Quiz App made with React");
    expect(getByTestId("start-quiz-btn")).toBeVisible();
  });
});

describe("Quiz button check", () => {
  const initialState = {
    questions: [],
    isFetching: false,
    error: null,
    currentQuestion: 0,
    currentAnswer: "",
    answers: [],
    showResults: false
  };

  const mockStore = configureStore();
  let store, wrapper;

  test("Quiz button click event", async () => {
    const leftClick = { button: 0 };
    store = mockStore(initialState);
    const { getByTestId, container, getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const startQuiz = await waitForElement(() =>
      getByTestId("start-quiz-navlink")
    );
    //console.log('START QUIZ', startQuiz);

    // fireEvent.click(screen.getByTestId("start-quiz-navlink"));
    fireEvent.click(screen.getByText(/start the quiz/i), leftClick);
    expect(getByTestId("quiz-form-heading")).toBeInTheDocument();
    //expect(startQuiz).toBeInTheDocument();
  });
});

// test("rendering a component that uses withRouter", () => {
//   const route = "/some-route";
//   renderWithRouter(<LocationDisplay />, { route });
//   expect(screen.getByTestId("location-display").textContent).toBe(route);
// });
