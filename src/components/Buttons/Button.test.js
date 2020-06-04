// @flow strict
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders without crashing", () => {
    const { getByText }: Object = render(
      <Button onClick={() => {}}>Enter</Button>
    );
    const textElement: HTMLElement = getByText(/Enter/i);
    expect(textElement).toBeInTheDocument();
  });

  test("has a valid snapshot", () => {
    const component: Object = renderer.create(
      <Button onClick={() => {}}>Enter</Button>
    );
    const tree: Object = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
