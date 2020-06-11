// @flow strict
import "./Sort.css";
import React from "react";
import { Button } from "../Buttons";

import type { Element, Node } from "react";

type SortProps = {
  activeSortKey: string,
  children?: Node,
  onSort: (string) => void,
  sortKey: string,
};

export function Sort({
  activeSortKey,
  children,
  onSort,
  sortKey,
}: SortProps): Element<typeof Button> {
  const sortClass: Array<string> = ["button-inline"];

  if (sortKey === activeSortKey) {
    sortClass.push("button-active");
  }

  return (
    <Button className={sortClass.join(" ")} onClick={() => onSort(sortKey)}>
      {children}
    </Button>
  );
}
