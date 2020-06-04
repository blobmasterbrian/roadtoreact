// @flow strict
import App from "./App";
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";

describe("App", () => {
  test("renders road to react", () => {
    const { getByText }: Object = render(<App />);
    const textElement: HTMLElement = getByText(/road to learn react/i);
    expect(textElement).toBeInTheDocument();
  });

  test("has a valid snapshot", () => {
    const component: Object = renderer.create(<App />);
    const tree: Object = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
