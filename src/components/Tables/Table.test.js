// @flow strict
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Table } from "./Table";

import type { Entry } from "./Table";

Enzyme.configure({ adapter: new Adapter() });

describe("Table", () => {
  const list: Array<Entry> = [
    {
      author: "brian",
      num_comments: 207,
      objectID: 80743,
      points: 55,
      title: "react",
      url: "https://reactjs.org/",
    },
    {
      author: "blobmaster",
      num_comments: 702,
      objectID: 43317,
      points: 36,
      title: "redux",
      url: "https://redux.js.org/",
    },
  ];

  test("renders without crashing", () => {
    const { getAllByText }: Object = render(
      <Table onDismiss={() => {}} list={list}>
        Dismiss
      </Table>
    );
    const textElements: Array<HTMLElement> = getAllByText(/Dismiss/i);
    textElements.map((textElement: HTMLElement) => {
      expect(textElement).toBeInTheDocument();
    });
  });

  test("has a valid snapshot", () => {
    const component: Object = renderer.create(
      <Table onDismiss={() => {}} list={list}>
        Dismiss
      </Table>
    );
    const tree: Object = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("shows two items in list", () => {
    const element: Object = shallow(
      <Table onDismiss={() => {}} list={list}>
        Dismiss
      </Table>
    );

    expect(element.find(".table-row").length).toBe(2);
  });
});
