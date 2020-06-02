// @flow strict
import "./Search.css";
import React from "react";

import type { Element, Node } from "react";

type SearchProps = {
  children?: Node,
  onChange: (SyntheticInputEvent<>) => void,
  onSubmit: (Event) => void,
  searchTerm: string,
};

export function Search({
  searchTerm,
  onChange,
  onSubmit,
  children,
}: SearchProps): Element<"form"> {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onChange(event)}
      />
      <button type="submit">{children}</button>
    </form>
  );
}
