// @flow strict
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading", () => {
  test("renders without crashing", () => {
    const { getByText }: Object = render(<Loading />);
    const textElement: HTMLElement = getByText(/Loading/i);
    expect(textElement).toBeInTheDocument();
  });

  test("has a valid snapshot", () => {
    const component: Object = renderer.create(<Loading />);
    const tree: Object = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
