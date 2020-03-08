import React from "react";
import ReactDOM from "react-dom";
import Progress from "./Progress";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

afterEach(cleanup);

describe("Test Progress Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Progress></Progress>, div);
  });

  it("renders progrees correctly", () => {
    const { getByTestId } = render(
      <Progress current={4} total={25}></Progress>
    );
    expect(getByTestId("progress-check")).toHaveTextContent("Question 4 of 25");
  });

  it("matched snapshot", () => {
    const tree = renderer
      .create(<Progress current={6} total={30}></Progress>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
