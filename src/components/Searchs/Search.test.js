// @flow strict
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Search } from "./Search";

describe("Search", () => {
  test("renders without crashing", () => {
    const { getByText }: Object = render(
      <Search searchTerm="" onSubmit={() => {}} onChange={() => {}}>
        Search
      </Search>
    );
    const textElement: HTMLElement = getByText(/Search/i);
    expect(textElement).toBeInTheDocument();
  });

  test("has a valid snapshot", () => {
    const component: Object = renderer.create(
      <Search searchTerm="" onSubmit={() => {}} onChange={() => {}}>
        Search
      </Search>
    );
    const tree: Object = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
