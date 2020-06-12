// @flow strict
import "./Table.css";
import React, { useState } from "react";
import { Button } from "../Buttons";
import { Sort } from "../Sorts";
import { sortBy } from "lodash";

import type { Element, Node } from "react";

type TableProps = {
  children?: Node,
  list: Array<Entry>,
  onDismiss: (number) => void,
};

export type Entry = {
  author: string,
  num_comments: number,
  objectID: number,
  points: number,
  title: string,
  url: string,
};

const SORTS: { ... } = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENTS: (list) => sortBy(list, "comments").reverse(),
  POINTS: (list) => sortBy(list, "points").reverse(),
};

export function Table({
  children,
  list,
  onDismiss,
}: TableProps): Element<"div"> {
  const [sortKey, setSortKey]: [string, Object] = useState("NONE");
  const [isSortReverse, setSortReverse]: [boolean, Object] = useState(false);

  const onSort: (string) => void = (key) => {
    setSortReverse(key === sortKey && !isSortReverse);
    setSortKey(key);
  };

  const sortedList: Array<Entry> = SORTS[sortKey](list);
  const reverseSortedList: Array<Entry> = isSortReverse
    ? sortedList.reverse()
    : sortedList;
  const matchesSearch: (string) => (Entry) => boolean = (searchTerm) => {
    return (entry: Entry): boolean => {
      return !entry.title
        ? false
        : entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };

  return (
    <div className="table">
      <div className="table-header">
        <span style={largeColumn}>
          <Sort sortKey={"TITLE"} onSort={onSort} activeSortKey={sortKey}>
            Title
          </Sort>
        </span>
        <span style={midColumn}>
          <Sort sortKey={"AUTHOR"} onSort={onSort} activeSortKey={sortKey}>
            Author
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort sortKey={"COMMENTS"} onSort={onSort} activeSortKey={sortKey}>
            Comments
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort sortKey={"POINTS"} onSort={onSort} activeSortKey={sortKey}>
            Points
          </Sort>
        </span>
        <span style={smallColumn}>Archive</span>
      </div>
      {reverseSortedList.map((entry: Entry): Element<"div"> => (
        <div key={entry.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={entry.url}>{entry.title}</a>
          </span>
          <span style={midColumn}> {entry.author} </span>
          <span style={smallColumn}> {entry.num_comments} </span>
          <span style={smallColumn}> {entry.points} </span>
          <span style={smallColumn}>
            <Button
              onClick={(): void => onDismiss(entry.objectID)}
              className="button-inline"
            >
              {children}
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
}

const largeColumn: Object = {
  width: "40%",
};

const midColumn: Object = {
  width: "30%",
};

const smallColumn: Object = {
  width: "10%",
};
