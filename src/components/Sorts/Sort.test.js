// @flow strict
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Sort } from "./Sort";

Enzyme.configure({ adapter: new Adapter() });

describe("Sort", () => {
  test("renders without crashing", () => {
    const { getByText }: Object = render(
      <Sort activeSortKey="TITLE" onSort={() => {}} sortKey="TITLE">
        Sort
      </Sort>
    );
    const textElement: HTMLElement = getByText(/Sort/i);
    expect(textElement).toBeInTheDocument();
  });

  test("has a valid snapshot", () => {
    const component: Object = renderer.create(
      <Sort activeSortKey="TITLE" onSort={() => {}} sortKey="TITLE">
        Sort
      </Sort>
    );
    const tree: Object = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("shows sort button", () => {
    const element: Object = shallow(
      <Sort activeSortKey="TITLE" onSort={() => {}} sortKey="TITLE">
        Sort
      </Sort>
    );

    expect(element.find("button"));
  });
});
