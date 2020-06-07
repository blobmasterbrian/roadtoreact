// @flow strict
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Button } from "./Button";

Enzyme.configure({ adapter: new Adapter() });

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

  test("shows button", () => {
    const element: Object = shallow(<Button onClick={() => {}}>Enter</Button>);

    expect(element.find("button"));
  });
});
