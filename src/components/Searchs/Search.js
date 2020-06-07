// @flow strict
import "./Search.css";
import React, { useEffect, useRef } from "react";

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
  const inputElement: Object = useRef();
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputElement}
        type="text"
        value={searchTerm}
        onChange={(event) => onChange(event)}
      />
      <button type="submit">{children}</button>
    </form>
  );
}
