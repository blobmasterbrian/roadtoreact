// @flow strict
import "./Table.css";
import React from "react";
import { Button } from "../Buttons";

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

export function Table({
  children,
  list,
  onDismiss,
}: TableProps): Element<"div"> {
  const matchesSearch: (string) => (Entry) => boolean = (searchTerm) => {
    return (entry: Entry): boolean => {
      return !entry.title
        ? false
        : entry.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };

  return (
    <div className="table">
      {list.map((entry: Entry): Element<"div"> => (
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
