// @flow strict
import "./Button.css";
import React from "react";
import type { Element, Node } from "react";

type ButtonProps = {
  children?: Node,
  className?: string,
  onClick: (number) => void,
};

export function Button({
  onClick,
  className,
  children,
}: ButtonProps): Element<"button"> {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}
